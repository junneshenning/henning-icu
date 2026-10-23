# Portafolio — Junnes Henning

Sitio web estático (HTML/CSS/JS) inspirado en **Wilson Kinyua's Portfolio v2024**, construido con los datos de https://www.henning.icu.

Diseñado para publicar en **GitHub Pages**. Solo requiere subir el repositorio y activar Pages.

---

## Estructura de carpetas

```
henning-icu-2026/
├── .github/
│   └── workflows/
│       └── send-email.yml          # GitHub Actions que envía correo vía Resend
├── index.html                      # Página principal (una sola página)
├── privacy.html                    # Política de privacidad
├── terms.html                      # Términos de servicio
├── 404.html                        # Página de error 404
├── README.md
└── assets/
    ├── css/
    │   └── style.css               # Estilos (tema oscuro, acentos cian/violeta)
    ├── js/
    │   └── main.js                 # Interactividad + envío de formulario
    ├── images/
    │   ├── logo.png                # TU LOGO personal
    │   ├── clients/                # LOGOS DE TUS CLIENTES (7 logos ya incluidos)
    │   ├── works/                  # IMÁGENES DE TUS TRABAJOS / screenshots (vacío, súbelos aquí)
    │   ├── certifications/         # TUS CERTIFICACIONES (vacío, súbelas aquí)
    │   └── icons/                  # Iconos de tecnologías (devicons)
    └── documents/
        └── .gitkeep                # TU CV aquí (ej: CV.pdf)
```

### ¿Dónde subo cada cosa?

| Carpeta | Qué subir | Formato sugerido |
|---------|-----------|------------------|
| `assets/images/logo.png` | Tu logo personal | PNG con fondo transparente |
| `assets/images/clients/` | Logos de tus clientes | PNG/SVG |
| `assets/images/works/` | Imágenes/capturas de tus trabajos | JPG/PNG/WebP |
| `assets/images/certifications/` | Tus certificaciones | JPG/PNG |
| `assets/documents/` | Tu CV | PDF |

> Las carpetas `works/`, `certifications/` y `documents/` están vacías intencionalmente para que tú subas tus archivos. Solo recuerda eliminar el archivo `.gitkeep` si vas a agregar archivos reales en esas carpetas (o déjalo, no afecta).

---

## Despliegue en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `henning-icu`.
2. Sube todos los archivos a la rama `main`.
3. En el repositorio ve a **Settings → Pages**.
4. **Build and deployment → Source**: selecciona Branch `main`, Folder `/ (root)`.
5. Guarda. En unos minutos estará en `https://<usuario>.github.io/henning-icu/`.

### Dominio personalizado (`henning.icu`)

Crea un archivo `CNAME` en la raíz con el contenido `henning.icu`, configúralo en GitHub Pages y apunta los registros A de tu DNS a:
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

---

## Envío de correo con Resend

GitHub Pages es estático, por lo que **no puedes llamar a la API de Resend directamente desde el frontend** (expondría tu API Key). La solución es usar **GitHub Actions + Resend**:

### 1. Configura el secreto de Resend

En tu repositorio de GitHub ve a:
**Settings → Secrets and variables → Actions → New repository secret**

- Nombre: `RESEND_API_KEY`
- Valor: tu API Key de Resend (`re_xxxx...`)

### 2. Configura el token de GitHub (para disparar el workflow desde el frontend)

El archivo `.github/workflows/send-email.yml` se activa mediante un `repository_dispatch`. Para que el frontend lo dispare, necesitas un **Personal Access Token** de GitHub:

1. Ve a **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Genera un token con scope `repo` (solo lectura/escritura de repositorio)
3. Copia el token y pégalo en `assets/js/main.js` en la constante `GITHUB_PAT`

> ⚠️ Nota: al poner el token en un archivo estático, cualquiera que vea el código fuente podrá verlo. Limita el token al mínimo necesario (solo `repo`) y revócalo si sospechas de uso indebido. Si prefieres no exponer tokens, considera usar [Formspree](https://formspree.io) o [EmailJS](https://www.emailjs.com/) en su lugar.

### 3. Correo de prueba

El workflow envía el mensaje a `contact@henning.icu` y usa `reply_to` con el correo del visitante, para que puedas responder directamente.

---

## Formulario de contacto

El formulario en `index.html` envía los datos al workflow de GitHub Actions, el cual usa Resend para entregar el correo. Edita `assets/js/main.js` si quieres cambiar el destinatario o el remitente.

---

## Personalización rápida

- Colores y tipografía: edita las variables CSS al inicio de `assets/css/style.css` (`:root`).
- Imágenes: reemplaza los archivos en `assets/images/`.
- Texto: edita directamente `index.html`.

---

## Licencia

Uso personal y profesional. Créditos de diseño inspirados en Wilson Kinyua's Portfolio v2024.
