/**
 * Main JavaScript for the Dharma Putra Maritime landing page
 * Handles: AOS init, navbar scroll, mobile menu, counters, contact form
 */
(function () {
  function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }

  function initNavbar() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 50) {
        navbar.classList.add("shadow-md");
        navbar.classList.replace("h-20", "h-16");
      } else {
        navbar.classList.remove("shadow-md");
        navbar.classList.replace("h-16", "h-20");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navLinksContainer = document.querySelector("nav .md\\:flex");
    if (!menuBtn || !navLinksContainer) return;

    let mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenu) {
      mobileMenu = document.createElement("div");
      mobileMenu.id = "mobile-menu";
      mobileMenu.className =
        "fixed inset-0 bg-brand-900/95 z-40 transform translate-x-full transition-transform duration-300 md:hidden flex flex-col items-center justify-center space-y-8";

      // Clone nav links
      navLinksContainer.querySelectorAll("a").forEach((link) => {
        const clone = link.cloneNode(true);
        clone.className =
          "text-white text-2xl font-serif font-bold hover:text-brand-gold transition-colors";
        clone.addEventListener("click", toggleMenu);
        mobileMenu.appendChild(clone);
      });

      // Close button
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML =
        '<i class="fa-solid fa-times text-4xl text-white"></i>';
      closeBtn.className = "absolute top-6 right-6 focus:outline-none";
      closeBtn.addEventListener("click", toggleMenu);
      mobileMenu.appendChild(closeBtn);

      document.body.appendChild(mobileMenu);
    }

    function toggleMenu() {
      mobileMenu.classList.toggle("translate-x-full");
      document.body.classList.toggle("overflow-hidden");
    }

    menuBtn.addEventListener("click", toggleMenu);
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const speed = 200;

    const animate = () => {
      counters.forEach((counter) => {
        const target = +counter.dataset.target;
        const update = () => {
          const count = +counter.innerText;
          const inc = target / speed;
          if (count < target) {
            counter.innerText = Math.ceil(count + inc).toString();
            setTimeout(update, 20);
          } else {
            counter.innerText = target.toString();
          }
        };
        update();
      });
    };

    let counted = false;
    const statsSection = counters[0]?.closest(".grid");
    if (!statsSection) return;

    const onScroll = () => {
      const triggerPoint =
        statsSection.getBoundingClientRect().top + window.scrollY - 100;
      if (!counted && window.scrollY + window.innerHeight > triggerPoint) {
        animate();
        counted = true;
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const btn = document.getElementById("submitBtn");
    if (!form || !btn) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const original = btn.innerHTML;

      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
      btn.classList.add("opacity-75", "cursor-not-allowed");

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Terkirim!';
        btn.classList.remove("bg-brand-900");
        btn.classList.add("bg-green-600");

        setTimeout(() => {
          btn.innerHTML = original;
          btn.classList.add("bg-brand-900");
          btn.classList.remove(
            "bg-green-600",
            "opacity-75",
            "cursor-not-allowed",
          );
          form.reset();
          alert("Terima kasih! Pesan Anda telah kami terima.");
        }, 2000);
      }, 1500);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAOS();
    initNavbar();
    initMobileMenu();
    initCounters();
    initContactForm();
  });
})();
