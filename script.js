/* ===========================
   1. TYPING EFFECT (Missing in original)
=========================== */
const typingElement = document.getElementById("typing");
const words = ["Data Scientist", "ML Engineer", "Data Analyst", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex++);
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing when page loads
document.addEventListener('DOMContentLoaded', typeEffect);


/* ===========================
   2. MOBILE MENU
=========================== */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
    // Toggle icon animation
    const icon = hamburger.querySelector('i');
    if (navbar.classList.contains("nav-open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
  
  // Close menu when clicking a link
  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
      hamburger.querySelector('i').classList.remove("fa-xmark");
      hamburger.querySelector('i').classList.add("fa-bars");
    });
  });
}

/* ===========================
   3. DARK MODE TOGGLE
=========================== */
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;
const icon = toggleBtn ? toggleBtn.querySelector("i") : null;

// Check Local Storage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  if (icon) { icon.classList.replace("fa-moon", "fa-sun"); }
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    
    // Icon Swap
    if (icon) {
      if (isDark) {
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        icon.classList.replace("fa-sun", "fa-moon");
      }
    }
    
    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

/* ===========================
   4. SCROLL REVEAL ANIMATION
=========================== */
// const observerOptions = { threshold: 0.1 };
// const revealObserver = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("reveal-active");
//       observer.unobserve(entry.target);
//     }
//   });
// }, observerOptions);

// document.querySelectorAll('.reveal').forEach(el => {
//   revealObserver.observe(el);
// });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll(".reveal");
      children.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("reveal-active");
        }, i * 120);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});


/* ===========================
   5. CURSOR GLOW
=========================== */
const glow = document.querySelector(".cursor-glow");
if (glow) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    // Smooth easing
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});
const hero = document.querySelector(".hero-image");

window.addEventListener("mousemove", e => {
  if (!hero) return;
  const x = (window.innerWidth / 2 - e.clientX) / 30;
  const y = (window.innerHeight / 2 - e.clientY) / 30;
  hero.style.transform = `translate(${x}px, ${y}px)`;
});
