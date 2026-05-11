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
    speed = 1500; isDeleting = true;
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
            setTimeout(() => el.classList.add("reveal-active"), i * 130);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("section").forEach(section => observer.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("reveal-active"));
}

/* ===========================
   5. SCROLL PROGRESS BAR
=========================== */
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  const progressBar = document.querySelector(".scroll-progress");
  if (progressBar) progressBar.style.width = scrolled + "%";
});

/* ===========================
   6. PARTICLE CANVAS SYSTEM
=========================== */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas || isMobile) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  const PARTICLE_COUNT = 55;
  const CONNECTION_DIST = 130;
  const PRIMARY = [0, 86, 179];

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const isDark = document.body.classList.contains("dark");
    const alpha = isDark ? 0.85 : 0.6;

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.3 * alpha;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${PRIMARY[0]}, ${PRIMARY[1]}, ${PRIMARY[2]}, ${lineOpacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PRIMARY[0]}, ${PRIMARY[1]}, ${PRIMARY[2]}, ${p.opacity * alpha})`;
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => { resize(); });
  init();
  draw();
})();

/* ===========================
   7. ANIMATED COUNTER
=========================== */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const isDecimal = el.dataset.decimal === "true";
  const places = parseInt(el.dataset.places) || 1;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    if (isDecimal) {
      el.textContent = value.toFixed(places) + suffix;
    } else {
      el.textContent = Math.floor(value) + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(update);
}

// Trigger counters when they enter viewport
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".counter").forEach(el => counterObserver.observe(el));

/* ===========================
   8. 3D TILT EFFECT ON CARDS
=========================== */
if (!isMobile) {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;
      const rotateY = ((x - cx) / cx) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.transition = "transform 0.1s ease";

      // Move the shine element
      const shine = card.querySelector(".card-shine");
      if (shine) {
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.18), transparent 60%)`;
        shine.style.opacity = "1";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.5s ease";
      const shine = card.querySelector(".card-shine");
      if (shine) shine.style.opacity = "0";
    });
  });
}

/* ===========================
   9. RIPPLE EFFECT ON BUTTONS
=========================== */
document.querySelectorAll(".ripple-btn").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 700);
  });
});

/* ===========================
   10. CURSOR EFFECTS (DESKTOP)
=========================== */
if (!isMobile) {
  const glow = document.querySelector(".cursor-glow");
  const dot = document.querySelector(".cursor-dot");

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (dot) {
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    }
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    if (glow) {
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Grow cursor on interactive elements
  const hoverTargets = document.querySelectorAll("a, button, .tilt-card");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (glow) glow.classList.add("cursor-hover");
      if (dot) dot.classList.add("cursor-hover");
    });
    el.addEventListener("mouseleave", () => {
      if (glow) glow.classList.remove("cursor-hover");
      if (dot) dot.classList.remove("cursor-hover");
    });
  });

  /* Magnetic Buttons */
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });
  });
}

/* ===========================
   11. TEXT SCRAMBLE EFFECT
=========================== */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.original = el.textContent;
  }
  scramble() {
    let iterations = 0;
    const original = this.original;
    const interval = setInterval(() => {
      this.el.textContent = original.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i < iterations) return original[i];
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }).join("");
      if (iterations >= original.length) {
        clearInterval(interval);
        this.el.textContent = original;
      }
      iterations += 1 / 2;
    }, 30);
  }
}

document.querySelectorAll(".scramble-badge").forEach(badge => {
  const scrambler = new TextScramble(badge);
  badge.addEventListener("mouseenter", () => scrambler.scramble());
});

/* ===========================
   12. EXPERIENCE TIMELINE DRAW
=========================== */
(function initTimelineDraw() {
  const expList = document.querySelector(".experience-list");
  if (!expList || isMobile) return;

  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        expList.classList.add("timeline-drawn");
        timelineObserver.unobserve(expList);
      }
    });
  }, { threshold: 0.2 });

  timelineObserver.observe(expList);
})();

/* ===========================
   13. HERO TAGLINE WORD REVEAL
=========================== */
(function heroTaglineReveal() {
  const tagline = document.querySelector(".hero-tagline");
  if (!tagline) return;
  const text = tagline.textContent;
  const words = text.split(" ");
  tagline.innerHTML = words.map((w, i) =>
    `<span class="word-reveal" style="animation-delay:${0.8 + i * 0.1}s">${w}</span>`
  ).join(" ");
})();

/* ===========================
   14. ACTIVE NAV LINK ON SCROLL
=========================== */
(function activeNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("nav-active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("nav-active");
      }
    });
  });
})();

/* ===========================
   15. FORM FIELD FOCUS EFFECTS
=========================== */
document.querySelectorAll(".form-field input, .form-field textarea").forEach(field => {
  field.addEventListener("focus", () => {
    field.closest(".form-field").classList.add("focused");
  });
  field.addEventListener("blur", () => {
    field.closest(".form-field").classList.remove("focused");
  });
});

/* ===========================
   16. HERO IMAGE PARALLAX
=========================== */
if (!isMobile) {
  const heroImage = document.querySelector(".hero-image");
  window.addEventListener("scroll", () => {
    if (!heroImage) return;
    const scrollY = window.scrollY;
    heroImage.style.transform = `translateY(${scrollY * 0.08}px)`;
  });
}