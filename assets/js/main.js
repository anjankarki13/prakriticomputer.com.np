/* ==========================================================================
   Prakriti Computer — site behaviour
   Vanilla JS, no dependencies. Loaded with `defer` on every page.
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Theme (light / dark) — remembers the visitor's choice
     The initial theme is applied by the inline script in <head> so the page
     never flashes the wrong colours; this only wires up the toggle button.
     ---------------------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light mode" : "Switch to dark mode");
      try {
        localStorage.setItem("pc-theme", next);
      } catch (e) {
        /* storage blocked — the choice just won't persist */
      }
    });
  }

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav__toggle");
  var navMenu = document.getElementById("primary-menu");

  function closeNav() {
    if (!navMenu) return;
    navMenu.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close after tapping a link
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Close when the viewport grows back to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 940) closeNav();
    });
  }

  /* ----------------------------------------------------------------------
     Sticky-header shadow + back-to-top visibility
     ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".fab--top");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-stuck", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 500);
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  var revealables = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (!entry.isIntersecting) return;
          // Small stagger so groups of cards cascade in
          var delay = Math.min(i * 70, 350);
          setTimeout(function () {
            entry.target.classList.add("is-in");
          }, delay);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.08 }
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------------------
     Enquiry form
     This is a static site, so there is no server to post to. The form
     builds a tidy message and hands it to the visitor's own mail app.
     To collect submissions online instead, see README.md ("Contact form").
     ---------------------------------------------------------------------- */
  var form = document.getElementById("enquiry-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var get = function (k) {
        return String(data.get(k) || "").trim();
      };

      var subject = "Website enquiry: " + (get("service") || "General");
      var body = [
        "Name: " + get("name"),
        "Phone: " + get("phone"),
        "Email: " + (get("email") || "-"),
        "Service: " + (get("service") || "-"),
        "",
        "Message:",
        get("message"),
        "",
        "— Sent from prakriticomputer.com.np"
      ].join("\n");

      var to = form.getAttribute("data-mailto") || "info@prakriticomputer.com.np";
      var status = document.getElementById("form-status");

      if (status) {
        status.hidden = false;
        status.textContent =
          "Opening your email app with the enquiry ready to send. If nothing opens, please call us on 9801444271.";
      }

      window.location.href =
        "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
})();
