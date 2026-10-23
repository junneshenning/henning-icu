# Portafolio — Junnes Henning

Sitio web estático (HTML/CSS/JS) inspirado en la plantilla **Wilson Kinyua's Portfolio v2024** de Figma, construido con los datos de https://www.henning.icu.

Diseñado para publicar en **GitHub Pages**. Solo necesitas subir el repositorio y activar Pages; no requiere servidor ni backend.

---

## Estructura del proyecto

```
henning-icu-2026/
├── index.html          # Página principal (una sola página, secciones)
├── privacy.html        # Política de privacidad
├── terms.html          # Términos de servicio
├── 404.html            # Página de error 404
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos (tema oscuro, glassmorphism, responsive)
│   ├── js/
│   │   └── main.js     # Interactividad (menú, scroll, filtros, formulario)
│   └── images/
│       ├── logo.png
│       ├── icons/      # Iconos de tecnologías (devicons)
│       └── portfolio/  # Logos de clientes (7 proyectos)
```

Contenido incluido (tomado de tu sitio actual):
- Hero: Junnes Henning — SysAdmin, Cloud Architect, IT Manager & Consultant
- Sobre mí, Experiencia (Linux Support, Consultoría TI, Automatización, Seguridad)
- Habilidades: Linux/Unix, LAMP/LEMP, HTML/CSS, WordPress, Magento, AWS, GCP, Azure, Cloudflare, Cpanel, DNS, SEO, Seguridad
- Portafolio: Licores Mundiales, Logoscorp, Droguería Nena, Farmacias Xana, Beca Inmobiliaria, Mind Melt, The Hachar Law Group (con filtros por categoría)
- Trayectoria: AcidLabs, Droguería Nena, Logoscorp, Soporte S.P.I., Toyoavila
- Certificaciones: Google Workspace Administrator, ITILv3 Foundation, AWS Solutions Architect Associate (en progreso)
- Contacto: correo y ubicación

---

## Despliegue en GitHub Pages (pasos rápidos)

1. Crea un repositorio en GitHub, por ejemplo `henning-icu`.
2. Sube todos los archivos de este proyecto a la rama `main` (o `master`).
3. En el repositorio de GitHub ve a **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona:
   - Branch: `main` (o `master`)
   - Folder: `/ (root)`
5. Haz clic en **Save**. En unos minutos el sitio estará publicado en:
   `https://<tu-usuario>.github.io/<repositorio>/`

### Dominio personalizado (opcional)

Si quieres usar `henning.icu`:
1. Agrega un archivo `CNAME` en la raíz del repositorio con el contenido:
   ```
   henning.icu
   ```
2. En GitHub Pages, escribe `henning.icu` como **Custom domain** y guarda.
3. Configura en tu proveedor de DNS un registro:
   - Tipo `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - O un `CNAME` de `www` → `<tu-usuario>.github.io`

---

## Formulario de contacto

GitHub Pages es estático, por lo que el formulario no envía correos por sí solo. En `assets/js/main.js` el formulario está configurado para:

- **Opción A (por defecto):** al enviar, abre el cliente de correo predeterminado del visitante con un borrador dirigido a `contact@henning.icu`.
- **Opción B (recomendada):** descomenta el bloque de `fetch` en `assets/js/main.js` y configura un endpoint de [Formspree](https://formspree.io) (o similar) para recibir los mensajes por email de verdad.

Cambia el correo `contact@henning.icu` en `index.html` y `assets/js/main.js` por el que prefieras.

---

## Personalización rápida

- Colores y tipografía: edita las variables CSS al inicio de `assets/css/style.css` (`:root`).
- Imágenes: reemplaza `assets/images/logo.png` y los logos de `assets/images/portfolio/`.
- Texto: edita directamente `index.html`.

---

## Licencia

Uso personal y profesional. Créditos de diseño inspirados en Wilson Kinyua's Portfolio v2024.
