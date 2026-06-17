const navToggle = document.querySelector("[data-nav-toggle]");
const mainNav = document.querySelector("[data-main-nav]");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    mainNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

const currentPage = window.location.pathname.split("/").pop() || "Climature.html";

document.querySelectorAll("[data-main-nav] a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

/* ---- Scroll reveal (fade-up) ---- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (revealEls.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

/* ---- Animated count-up for the hero live readout ---- */
const countEls = document.querySelectorAll("[data-count-to]");

countEls.forEach((el) => {
  const target = parseFloat(el.getAttribute("data-count-to"));
  const decimals = parseInt(el.getAttribute("data-count-decimals") || "0", 10);
  if (Number.isNaN(target)) return;

  if (reduceMotion) {
    el.textContent = target.toFixed(decimals);
    return;
  }

  const duration = 1400;
  let start = null;
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const tick = (now) => {
    if (start === null) start = now;
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = (target * ease(progress)).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(tick);
  };

  const startCount = () => requestAnimationFrame(tick);

  if ("IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCount();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    countObserver.observe(el);
  } else {
    startCount();
  }
});
