/**
 * Main JavaScript for Dharma Putra Maritime
 * Handles: Counters, Mobile Menu, Contact Form, and Premium Interactions
 */

(function () {
  /**
   * Initialize Counter Animation
   */
  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const observerOptions = {
      threshold: 0.5,
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 2000; // 2 seconds
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.innerText = Math.ceil(current).toLocaleString();
            }
          }, stepTime);

          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /**
   * Initialize Mobile Menu Logic
   */
  function initMobileMenu() {
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const body = document.body;

    // Check if mobile menu exists, if not create it dynamically to stay DRY
    let mobileMenu = document.getElementById("mobile-menu");

    if (!mobileMenu && mobileBtn) {
      mobileMenu = document.createElement("div");
      mobileMenu.id = "mobile-menu";
      mobileMenu.className =
        "fixed inset-0 bg-brand-950 z-[100] transform translate-x-full transition-transform duration-500 flex flex-col items-center justify-center p-8";

      const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
      ];

      const linksHtml = navLinks
        .map(
          (link) => `
        <a href="${link.href}" class="text-3xl font-serif font-bold text-white mb-8 hover:text-brand-gold transition-colors mobile-link">
          ${link.name}
        </a>
      `,
        )
        .join("");

      mobileMenu.innerHTML = `
        <button id="close-menu" class="absolute top-8 right-8 text-white p-2">
           <i class="fa-solid fa-xmark text-3xl"></i>
        </button>
        ${linksHtml}
        <div class="mt-12 w-full h-px bg-white/10"></div>
        <p class="mt-8 text-brand-gold font-bold tracking-widest text-xs uppercase">Dharma Putra Maritime</p>
      `;

      body.appendChild(mobileMenu);

      const closeBtn = document.getElementById("close-menu");
      const toggle = () => {
        mobileMenu.classList.toggle("translate-x-full");
        body.classList.toggle("overflow-hidden");
      };

      mobileBtn.addEventListener("click", toggle);
      closeBtn.addEventListener("click", toggle);

      // Close on link click
      mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", toggle);
      });
    }
  }

  /**
   * Initialize Contact Form Submission
   */
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const originalContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Processing...`;

      // Simulate API call
      setTimeout(() => {
        submitBtn.classList.remove("bg-brand-900");
        submitBtn.classList.add("bg-green-600");
        submitBtn.innerHTML = `<i class="fa-solid fa-check mr-2"></i> Message Sent Successfully`;

        form.reset();

        setTimeout(() => {
          submitBtn.classList.add("bg-brand-900");
          submitBtn.classList.remove("bg-green-600");
          submitBtn.innerHTML = originalContent;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Lifecycle Entry Point
  document.addEventListener("DOMContentLoaded", () => {
    initCounters();
    initMobileMenu();
    initContactForm();
  });
})();
