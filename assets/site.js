document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const mobileToggle = document.getElementById("mobileToggle");
  const pageProgress = document.querySelector(".page-progress");

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
  // ANIMATION 1: Text Reveal (hero subtitle word-by-word)
  // ============================================================
  const heroSub = document.querySelector(".hero-sub");
  if (heroSub) {
    const text = heroSub.textContent.trim();
    const words = text.split(/\s+/);
    heroSub.innerHTML = words.map((word, i) => {
      const delay = 0.9 + i * 0.04; // staggered from 0.9s
      return `<span class="text-reveal-word"><span style="transition-delay:${delay.toFixed(2)}s">${word}</span></span>`;
    }).join(" ");

    // Trigger after a short delay to allow CSS to parse
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroSub.classList.add("text-reveal-active");
      });
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

  // Also animate the hero stats if they have data-count attributes
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    const heroCounterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("[data-count]").forEach((element, i) => {
              setTimeout(() => {
                animateCounter(element, parseInt(element.dataset.count, 10), 1200);
              }, i * 120);
            });
            heroCounterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    heroCounterObserver.observe(heroStats);
  }

});
