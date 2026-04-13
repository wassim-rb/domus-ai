document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const mobileToggle = document.getElementById("mobileToggle");
  const pageProgress = document.querySelector(".page-progress");
  const heroScene = document.querySelector("[data-hero-scroll]");

  const closeMenu = () => {
    if (!navLinks || !mobileToggle) {
      return;
    }

    navLinks.classList.remove("open");
    mobileToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const syncNav = () => {
    if (navbar) {
      navbar.classList.toggle("is-scrolled", window.scrollY > 40);
    }

    if (pageProgress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      pageProgress.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    }
  };

  syncNav();
  window.addEventListener("scroll", syncNav, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ============================================================
  // SCROLL REVEAL (existing)
  // ============================================================
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  // ============================================================
  // FAQ ACCORDION (existing)
  // ============================================================
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item?.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("open");
        faqItem.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (item && !isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ============================================================
  // HERO SCROLL SCENE (homepage only)
  // ============================================================
  if (heroScene) {
    const desktopHeroMedia = window.matchMedia("(min-width: 769px)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let heroFrame = null;

    const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
    const mapRange = (value, start, end) => clamp((value - start) / (end - start));
    const easeOutCubic = (value) => 1 - Math.pow(1 - clamp(value), 3);
    const mapRangeEased = (value, start, end) => easeOutCubic(mapRange(value, start, end));

    const setHeroVar = (name, value) => {
      heroScene.style.setProperty(name, value.toFixed(4));
    };

    const setStaticHero = () => {
      heroScene.classList.add("hero-static");
      heroScene.classList.remove("is-proof", "is-settled");
      setHeroVar("--hero-progress", 0);
      setHeroVar("--intro-progress", 0);
      setHeroVar("--proof-1", 1);
      setHeroVar("--proof-2", 1);
      setHeroVar("--proof-3", 1);
      setHeroVar("--proof-panel-opacity", 1);
      setHeroVar("--metrics-progress", 1);
    };

    const updateHeroScene = () => {
      if (!desktopHeroMedia.matches || reducedMotionMedia.matches) {
        setStaticHero();
        return;
      }

      heroScene.classList.remove("hero-static");

      const totalScrollable = heroScene.offsetHeight - window.innerHeight;
      const rect = heroScene.getBoundingClientRect();
      const progress = totalScrollable > 0 ? clamp((-rect.top) / totalScrollable) : 0;

      setHeroVar("--hero-progress", progress);

      // Phase 1: Intro exit (0.0 → 0.30) - moves up and fades out
      setHeroVar("--intro-progress", mapRangeEased(progress, 0.0, 0.30));

      // Phase 2: Proof cards (0.28 → 0.62 with stagger)
      // Card 1: 0.28-0.48
      setHeroVar("--proof-1", mapRangeEased(progress, 0.28, 0.48));
      // Card 2: 0.35-0.55
      setHeroVar("--proof-2", mapRangeEased(progress, 0.35, 0.55));
      // Card 3: 0.42-0.62
      setHeroVar("--proof-3", mapRangeEased(progress, 0.42, 0.62));

      // Proof panel opacity (crossfade with intro, visible from ~0.25)
      setHeroVar("--proof-panel-opacity", mapRangeEased(progress, 0.22, 0.35));

      // Phase 3: Metrics (0.62 → 0.82) - appear after proof cards settle
      setHeroVar("--metrics-progress", mapRangeEased(progress, 0.62, 0.82));

      heroScene.classList.toggle("is-proof", progress >= 0.22);
      heroScene.classList.toggle("is-settled", progress >= 0.82);
    };

    const queueHeroUpdate = () => {
      if (heroFrame !== null) {
        cancelAnimationFrame(heroFrame);
      }

      heroFrame = requestAnimationFrame(() => {
        updateHeroScene();
        heroFrame = null;
      });
    };

    queueHeroUpdate();
    window.addEventListener("scroll", queueHeroUpdate, { passive: true });
    window.addEventListener("resize", queueHeroUpdate);
    desktopHeroMedia.addEventListener("change", queueHeroUpdate);
    reducedMotionMedia.addEventListener("change", queueHeroUpdate);
  }

  // ============================================================
  // ANIMATION 2: Animated Counter (smooth digit roll)
  // ============================================================
  const animateCounter = (element, target, duration = 1400) => {
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  // Observe results stats section
  const statsBlock = document.querySelector(".results-stats");
  if (statsBlock) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-count]").forEach((element, i) => {
              // Stagger each counter slightly
              setTimeout(() => {
                animateCounter(element, parseInt(element.dataset.count, 10), 1400);
              }, i * 150);
            });
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counterObserver.observe(statsBlock);
  }

});
