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

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // Marcar elementos que se revelan con scroll
  document.querySelectorAll(".section, .service-card, .skill-category, .portfolio-item, .timeline-item, .cert-card").forEach((el) => {
    el.classList.add("reveal");
  });

  // ---------- Filtro de portafolio ----------
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // Cambiar botón activo
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filtrar items
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

  // ---------- Formulario de contacto ----------
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Nota: GitHub Pages no soporta backend. Esta versión muestra confirmación
    // y abre el cliente de correo con los datos ya rellenados.
    const subject = encodeURIComponent(data.subject || "Consulta desde el portafolio");
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nCorreo: ${data.email}\nAsunto: ${data.subject || "-"}\n\nMensaje:\n${data.message}`
    );
    const mailto = `mailto:contact@henning.icu?subject=${subject}&body=${body}`;

    try {
      // Intento de envío via Formspree si se configura (opcional).
      // Descomenta y configura tu endpoint de Formspree para recibir emails reales:
      /*
      const response = await fetch("https://formspree.io/f/TU_ID", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: formData,
      });
      if (response.ok) {
        showFormNote("¡Mensaje enviado con éxito! Te responderé a la brevedad.", "success");
        contactForm.reset();
        return;
      }
      throw new Error("No se pudo enviar");
      */

      // Fallback: abrir cliente de correo predeterminado
      window.location.href = mailto;
      showFormNote("Se abrirá tu cliente de correo para completar el envío.", "success");
    } catch (err) {
      showFormNote("Hubo un error al enviar el mensaje. Inténtalo de nuevo.", "error");
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

  // Estilos activos para los enlaces de nav
  const style = document.createElement("style");
  style.textContent = `
    .nav-links a.active { color: var(--primary); }
  `;
  document.head.appendChild(style);

})();
