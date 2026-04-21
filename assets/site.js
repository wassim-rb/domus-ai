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
    };

    const updateHeroScene = () => {
      if (!desktopHeroMedia.matches || reducedMotionMedia.matches) {
        setStaticHero();
        return;
      }
      heroScene.classList.remove("hero-static");

      const totalScrollable = heroScene.offsetHeight - window.innerHeight;
      const rect = heroScene.getBoundingClientRect();
      const p = totalScrollable > 0 ? clamp((-rect.top) / totalScrollable) : 0;
      setHeroVar("--hero-progress", p);

      // Smoother easing — quintic out feels softer than cubic for long scrolls.
      const easeOutQuint = (v) => 1 - Math.pow(1 - clamp(v), 5);
      const mapEased = (v, a, b) => easeOutQuint(mapRange(v, a, b));

      // Phase 1 — Intro settles back (0.00 → 0.34). Longer tail so it doesn't snap out.
      setHeroVar("--intro-progress", mapEased(p, 0.00, 0.34));

      // Phase 2 — Proof cards emerge in place, heavily overlapped with intro.
      // Extended range now that the metrics rail is gone, so the cards take the
      // full weight of the scroll and settle more slowly for a more airy feel.
      setHeroVar("--proof-1", mapEased(p, 0.20, 0.52));
      setHeroVar("--proof-2", mapEased(p, 0.32, 0.66));
      setHeroVar("--proof-3", mapEased(p, 0.44, 0.80));
      setHeroVar("--proof-panel-opacity", mapEased(p, 0.14, 0.32));

      // Independent parallax channel for watermark (lags scroll, slight vertical droop)
      setHeroVar("--watermark-progress", easeOutQuint(p * 0.85));

      // Glow progress runs slower than scroll for weight.
      setHeroVar("--glow-progress", easeOutQuint(p * 1.15));

      heroScene.classList.toggle("is-proof", p >= 0.14);
      heroScene.classList.toggle("is-settled", p >= 0.80);
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
  // STEPS CINEMATIC SCENE (homepage only)
  // ============================================================
  const stepsScene = document.querySelector("[data-steps-scene]");
  if (stepsScene) {
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sceneFrame = null;
    let sceneInView = false;
    let sceneScrollBound = false;

    const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
    const mapRange = (value, start, end) => clamp((value - start) / (end - start));
    const easeOutCubic = (value) => 1 - Math.pow(1 - clamp(value), 3);
    const mapRangeEased = (value, start, end) => easeOutCubic(mapRange(value, start, end));

    const setSceneVar = (name, value) => {
      stepsScene.style.setProperty(name, value.toFixed(4));
    };

    const setStaticScene = () => {
      setSceneVar("--steps-progress", 1);
      setSceneVar("--steps-zoom", 1);
      setSceneVar("--steps-pan", 0);
      setSceneVar("--steps-glow", 0.38);
      setSceneVar("--steps-sweep", 0.5);
      setSceneVar("--steps-caption-1", 1);
      setSceneVar("--steps-caption-2", 1);
    };

    const updateStepsScene = () => {
      if (reducedMotionMedia.matches) {
        setStaticScene();
        return;
      }

      const rect = stepsScene.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.88;
      const end = -rect.height * 0.32;
      const progress = clamp((start - rect.top) / (start - end));

      const zoom = 1.01 + (progress * 0.09);
      const pan = mapRangeEased(progress, 0.05, 1);
      const glow = mapRangeEased(progress, 0.08, 0.92);
      const caption1 = mapRangeEased(progress, 0.1, 0.45);
      const caption2 = mapRangeEased(progress, 0.2, 0.62);

      setSceneVar("--steps-progress", progress);
      setSceneVar("--steps-zoom", zoom);
      setSceneVar("--steps-pan", pan);
      setSceneVar("--steps-glow", glow);
      setSceneVar("--steps-sweep", progress);
      setSceneVar("--steps-caption-1", caption1);
      setSceneVar("--steps-caption-2", caption2);
    };

    const queueSceneUpdate = () => {
      if (sceneFrame !== null) {
        return;
      }

      sceneFrame = requestAnimationFrame(() => {
        updateStepsScene();
        sceneFrame = null;
      });
    };

    const startSceneScroll = () => {
      if (sceneScrollBound) {
        return;
      }

      window.addEventListener("scroll", queueSceneUpdate, { passive: true });
      window.addEventListener("resize", queueSceneUpdate);
      sceneScrollBound = true;
    };

    const stopSceneScroll = () => {
      if (!sceneScrollBound) {
        return;
      }

      window.removeEventListener("scroll", queueSceneUpdate);
      window.removeEventListener("resize", queueSceneUpdate);
      sceneScrollBound = false;
    };

    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== stepsScene) {
            return;
          }

          sceneInView = entry.isIntersecting;
          if (sceneInView) {
            startSceneScroll();
            queueSceneUpdate();
          } else {
            stopSceneScroll();
          }
        });
      },
      { threshold: 0.08, rootMargin: "120px 0px 120px 0px" }
    );

    sceneObserver.observe(stepsScene);

    reducedMotionMedia.addEventListener("change", () => {
      if (!sceneInView && !reducedMotionMedia.matches) {
        return;
      }
      queueSceneUpdate();
    });
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
