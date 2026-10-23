/* ==========================================================================
   Junnes Henning Portfolio — Interactivity
   ========================================================================== */

(function () {
  "use strict";

  // ---------- Elementos ----------
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("nav-links");
  const navToggle = document.getElementById("nav-toggle");
  const navLinksItems = document.querySelectorAll(".nav-links a");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const contactForm = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");

  // ---------- Navbar: ocultar al bajar, mostrar al subir ----------
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavbar();
      });
      ticking = true;
    }
  });

  // ---------- Menú móvil ----------
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Cerrar menú al hacer clic fuera ----------
  document.addEventListener("click", (e) => {
    if (
      navLinks.classList.contains("open") &&
      !navbar.contains(e.target)
    ) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // ---------- Scroll reveal (Intersection Observer) ----------
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Marcar elementos que se revelan con scroll
  document
    .querySelectorAll(
      ".section, .service-card, .skill-category, .portfolio-item, .timeline-item, .cert-card"
    )
    .forEach((el) => el.classList.add("reveal"));

  // ---------- Filtro de portafolio ----------
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        const show = filter === "all" || category === filter;

        if (show) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  // ---------- Formulario de contacto (Resend vía GitHub Actions) ----------
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Para que esto funcione necesitas:
    // 1. Crear un secreto RESEND_API_KEY en tu repo (Settings → Secrets and variables → Actions)
    // 2. Crear un Personal Access Token de GitHub (con scope: repo) y ponerlo abajo en GITHUB_PAT
    //    (ó mejor: usar un servicio como Formspree/EmailJS si no quieres exponer tokens)
    const GITHUB_PAT = ""; // ← PEGA TU PERSONAL ACCESS TOKEN DE GITHUB AQUÍ (scope: repo)

    const owner = "junneshenning";
    const repo = "henning-icu";

    if (!GITHUB_PAT) {
      showFormNote(
        "Falta configurar el token de GitHub en assets/js/main.js",
        "error"
      );
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/dispatches`,
        {
          method: "POST",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${GITHUB_PAT}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_type: "contact-form-submit",
            client_payload: {
              name: data.name,
              email: data.email,
              subject: data.subject || "Sin asunto",
              message: data.message,
            },
          }),
        }
      );

      if (response.ok) {
        showFormNote(
          "¡Mensaje enviado con éxito! Te responderé a la brevedad.",
          "success"
        );
        contactForm.reset();
      } else {
        throw new Error("No se pudo disparar el envío");
      }
    } catch (err) {
      console.error(err);
      showFormNote(
        "Hubo un error al enviar el mensaje. Inténtalo de nuevo.",
        "error"
      );
    }
  });

  function showFormNote(message, type) {
    formNote.textContent = message;
    formNote.className = `form-note ${type}`;
    setTimeout(() => {
      formNote.textContent = "";
      formNote.className = "form-note";
    }, 5000);
  }

  // ---------- Resaltado del enlace de navegación activo ----------
  const sections = document.querySelectorAll("section[id]");
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinksItems.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.25 }
  );
  sections.forEach((section) => observerNav.observe(section));

  const style = document.createElement("style");
  style.textContent = `
    .nav-links a.active { color: var(--primary); }
  `;
  document.head.appendChild(style);
})();
