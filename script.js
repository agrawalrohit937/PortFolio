/* ===========================
   GLOBAL CHECKS
=========================== */
const isMobile = window.innerWidth <= 768;

/* ===========================
   1. TYPING EFFECT
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

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }

  setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* ===========================
   2. MOBILE MENU
=========================== */
const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".navbar");

if (hamburger && navbar) {
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("nav-open");
      const icon = hamburger.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });
}

/* ===========================
   3. DARK MODE TOGGLE
=========================== */
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  toggleBtn?.querySelector("i")?.classList.replace("fa-moon", "fa-sun");
}

toggleBtn?.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");

  toggleBtn.querySelector("i").classList.toggle("fa-moon");
  toggleBtn.querySelector("i").classList.toggle("fa-sun");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ===========================
   4. SCROLL REVEAL (STAGGERED)
=========================== */
if (!isMobile) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const reveals = entry.target.querySelectorAll(".reveal");
          reveals.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("reveal-active");
            }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });
} else {
  // Mobile: instantly reveal everything
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("reveal-active");
  });
}

/* ===========================
   5. DESKTOP-ONLY EFFECTS
=========================== */
if (!isMobile) {

  /* Cursor Glow */
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* Magnetic Buttons */
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

}
