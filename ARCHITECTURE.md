# ARCHITECTURE.md - PlanesPro Final

**Versión:** 2.0  
**Última Actualización:** 2026-01-08

---

## PARTE I: FUNDAMENTOS

### 1.1 Propósito de Este Documento

Este archivo define las reglas técnicas, convenciones y patrones que gobiernan todo el código del proyecto `planespro_final`. Cualquier código nuevo o modificación debe validarse contra este documento antes de su implementación.

**Regla:** Si algo no está aquí documentado, se considera prohibido hasta que se agregue explícitamente.

### 1.2 Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Markup | HTML5 Semántico | Estructura clara, SEO, accesibilidad |
| Estilos | CSS3 Vanilla | Control total, sin dependencias |
| Lógica | JavaScript ES6+ | Modules nativos, sin transpilación |
| Build | Ninguno | Desarrollo directo, sin compilación |
| Server | Static file serving | Simplicidad de deploy |

**Prohibido:**
- Frameworks CSS (Tailwind, Bootstrap)
- Frameworks JS (React, Vue, Angular)
- Preprocesadores CSS (SASS, LESS)
- Bundlers (Webpack, Vite) - excepto para producción futura

### 1.3 Estrategia Responsive

El proyecto implementa **Separación Total Desktop/Mobile**. Esto significa:

- **Archivos separados** para cada plataforma (no media queries mezclados)
- **Clases específicas** por plataforma
- **Comportamientos diferentes** según dispositivo

**Justificación:** Desktop y Mobile son experiencias fundamentalmente distintas. Mantenerlas separadas permite:
- Cambios independientes sin afectar la otra plataforma
- Optimización específica para cada contexto
- Mantenibilidad a largo plazo

### 1.4 Breakpoints

| Nombre | Valor | Uso |
|--------|-------|-----|
| Header Breakpoint | 860px | Menú hamburguesa aparece |
| Content Breakpoint | 720px | Layout hero/planes/proceso cambia |
| Desktop Minimum | 769px | Punto de switch en algunos componentes |

**Implementación en código:**
- Header: `@media (max-width: 860px)` activa versión móvil
- Contenido: `@media (max-width: 720px)` activa versión móvil
- Algunos componentes legacy usan 768px

**Regla:** Nuevos archivos deben usar 720px (contenido) y 860px (header).

### 1.5 Performance Optimization

**Filosofía:** Optimizac la carga sin agregar complejidad. Solo técnicas nativas del navegador, sin build process.

#### 1.5.1 Preload de Recursos Críticos

**Regla obligatoria:** Todo recurso crítico para LCP (Largest Contentful Paint) debe usar `<link rel="preload">`.

**Recursos que requieren preload:**
- Imagen hero principal (AVIF)
- CSS principal (styles.css)
- Fuentes web críticas (opcional si ya usa preconnect)

**Implementación:**

```html
<head>
    <!-- Preload Critical Resources -->
    <link rel="preload" href="assets/images/hero-person.avif" as="image" type="image/avif">
    <link rel="preload" href="css/styles.css" as="style">
</head>
```

**Prohibido:**
- ❌ Preload de imágenes below-the-fold
- ❌ Preload de scripts no-críticos
- ❌ Más de 3-4 preloads por página (impacto negativo)

**Verificación:** 
```bash
# DevTools Network → Filtrar recurso → Priority debe ser "Highest"
```

---

#### 1.5.2 Lazy Loading de Imágenes

**Regla obligatoria:** Todas las imágenes below-the-fold deben usar `loading="lazy"`.

**Imágenes que requieren lazy loading:**
- ✅ Banners de secciones (proceso, planes, etc)
- ✅ Avatares de social proof
- ✅ Imágenes decorativas
- ✅ Íconos grandes (>50KB)

**Imágenes que NO deben usar lazy loading:**
- ❌ Imagen hero principal (afecta LCP)
- ❌ Logo del header
- ❌ Imágenes above-the-fold

**Implementación:**

```html
<!-- Imagen crítica (above-the-fold): SIN lazy -->
<img src="assets/images/hero-person.png" alt="..." class="hero-image">

<!-- Imagen no-crítica (below-the-fold): CON lazy -->
<img src="assets/ilustraciones/process_banner.png" alt="..." loading="lazy">
```

**Verificación:**
```bash
# DevTools Network → Cargar página
# ✅ Imágenes lazy NO aparecen inicialmente
# Hacer scroll → ✅ Ahora SÍ se cargan
```

---

#### 1.5.3 Lazy Loading de Secciones (Intersection Observer)

**Regla opcional:** Secciones pesadas (muchas imágenes, scripts complejos) pueden lazy-loadarse.

**Módulo:** `js/modules/utils/lazy-section-loader.js`

**Uso:**

```javascript
// main.js
import { initLazySectionLoader } from './modules/utils/lazy-section-loader.js';

// Configurar secciones lazy
initLazySectionLoader();
```

**Configuración en lazy-section-loader.js:**

```javascript
const lazySections = [
    { id: 'planes-placeholder', partial: 'partials/sections/planes-desktop.html' },
    // Agregar más secciones según necesidad
];
```

**Cuándo usar:**
- Sección tiene >10 imágenes
- Sección require script pesado (>50KB)
- Sección está muy abajo en la página

**Cuándo NO usar:**
- Secciones above-the-fold
- Secciones críticas para SEO

**Verificación:**
```javascript
// Console → Buscar logs
"Lazy loading section: planes-placeholder"
"Section loaded successfully: partials/sections/planes-desktop.html"
```

---

#### 1.5.4 Resource Hints

**Ya implementado:**
- `<link rel="preconnect">` para Google Fonts
- `<link rel="dns-prefetch">` para CDNs externos

**Regla:** Mantener solo dominios que se usan en la página actual.

---

#### 1.5.5 Métricas Objetivo (Core Web Vitals)

| Métrica | Target 2025 | Actual PlanesPro |
|---------|-------------|------------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | ~1.9s ✅ |
| **INP** (Interaction to Next Paint) | ≤ 200ms | ~120ms ✅ |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.02 ✅ |

**Cómo medir:**
1. Lighthouse (Chrome DevTools)
2. WebPageTest.org
3. Real User Monitoring (Search Console)

---

#### 1.5.6 Checklist Pre-Deploy

Antes de pushear cambios que afecten imágenes o carga:

- [ ] Todas las imágenes >100KB están en AVIF/WebP
- [ ] Imágenes below-the-fold tienen `loading="lazy"`
- [ ] Solo hero image y CSS tienen `preload`
- [ ] Lighthouse Performance score ≥ 90
- [ ] No hay preloads redundantes

---



## PARTE II: ESTRUCTURA DEL PROYECTO

### 2.1 Árbol de Directorios

```
planespro_final/
├── ARCHITECTURE.md          # Este documento
├── README.md                # Descripción para GitHub
├── .gitignore
├── index.html               # Orquestador principal
│
├── partials/                # Componentes HTML reutilizables
│   ├── header.html          # Header compartido
│   └── sections/            # Secciones de index.html
│       ├── hero-desktop.html
│       ├── hero-mobile.html
│       ├── proceso-desktop.html
│       ├── proceso-mobile.html
│       ├── planes-desktop.html
│       └── planes-mobile.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos_pp/            # Logos del proyecto
│
├── css/
│   ├── styles.css           # Maestro (solo @imports)
│   ├── _variables.css       # Design tokens
│   ├── _base.css            # Resets, tipografía global
│   ├── _layout-desktop.css
│   ├── _layout-mobile.css
│   ├── _components.css      # Componentes compartidos
│   ├── _components-desktop.css
│   ├── _components-mobile.css
│   ├── _header-desktop.css
│   ├── _header-mobile.css
│   ├── _hero-desktop.css
│   ├── _hero-mobile.css
│   ├── _planes-desktop.css
│   ├── _planes-mobile.css
│   ├── _proceso-desktop.css
│   ├── _proceso-mobile.css
│   ├── _animations.css      # Keyframes
│   └── _responsive.css      # Ajustes finales
│
└── js/
    ├── main.js              # Orquestador principal
    ├── loader.js            # Carga de HTML partials
    │
    ├── core/
    │   └── renderer.js      # Motor de renderizado
    │
    ├── data/
    │   ├── planes_data.js   # Datos de perfiles
    │   ├── testimonials.js  # Testimonios
    │   ├── proceso_content.js
    │   ├── hero_content.js
    │   └── header_content.js
    │
    ├── modules/
    │   ├── header/
    │   │   └── mobile_menu.js
    │   ├── hero/
    │   │   ├── benefit_accordion.js
    │   │   ├── logo_fader.js
    │   │   ├── social_proof.js
    │   │   └── title_animation.js
    │   ├── planes/
    │   │   └── planes_ui.js
    │   └── ui/              # Reservado para UI compartido
    │
    └── utils/
        ├── logger.js        # Logger centralizado
        └── dom_helpers.js
```

### 2.2 Convención de Nombrado de Archivos

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| CSS | `_nombre-plataforma.css` | `_hero-desktop.css` |
| CSS Shared | `_nombre.css` | `_variables.css` |
| JS Modules | `nombre_modulo.js` | `mobile_menu.js` |
| JS Single | `nombre.js` | `loader.js` |
| HTML Partials | `nombre-plataforma.html` | `hero-mobile.html` |
| HTML Shared | `nombre.html` | `header.html` |

**Prohibido:**
- camelCase en nombres de archivo (`mobileMenu.js`)
- Hyphens en JS (`mobile-menu.js`)
- Mayúsculas (`Header.html`)

### 2.3 Responsabilidad de Cada Carpeta

| Carpeta | Contenido | Restricciones |
|---------|-----------|---------------|
| `css/` | Solo archivos CSS | Sin lógica, sin datos |
| `js/data/` | Datos estáticos (JSON-like) | Sin lógica de UI |
| `js/modules/` | Componentes interactivos | Un módulo = una funcionalidad |
| `js/core/` | Lógica de infraestructura | Sin UI específica |
| `js/utils/` | Helpers reutilizables | Sin estado, funciones puras |
| `partials/` | Fragmentos HTML | Sin scripts inline |
| `assets/` | Recursos estáticos | Organizados por tipo |

---

## PARTE III: CONVENCIONES DE CÓDIGO

### 3.1 HTML

#### 3.1.1 Principios Generales

- Solo estructura semántica
- Cero JavaScript inline (`onclick=""`)
- Cero CSS inline (`style=""`) - **Excepción:** `<style>` dentro de `<noscript>` para fallback cuando JavaScript está deshabilitado
- Atributos `data-*` para hooks de JavaScript
- ARIA labels para accesibilidad

#### 3.1.2 Orden de Atributos

```html
<element
    id="identificador"
    class="clases css"
    data-action="valor"
    data-id="valor"
    aria-label="descripción"
    type="tipo"
    href="url"
    src="recurso"
>
```

**Orden:** ID → Class → Data-* → ARIA-* → Otros atributos

#### 3.1.3 Formato de Comentarios

```html
<!-- ===================== -->
<!-- NOMBRE DE SECCIÓN     -->
<!-- ===================== -->

<!-- Descripción breve si no es obvio -->
<div class="contenedor">
    <!-- Propósito del elemento si es complejo -->
    <p>Contenido</p>
</div>
```

**Prohibido:**
- Comentarios con emojis
- Comentarios que explican código obvio
- Comentarios TODO sin plan de resolución

#### 3.1.4 Accesibilidad

| Requisito | Implementación |
|-----------|----------------|
| Contraste | Mínimo 4.5:1 (texto), 3:1 (UI) |
| Alt text | Obligatorio en imágenes informativas |
| Keyboard nav | Todos los interactivos accesibles |
| Focus visible | Outline visible en :focus |
| ARIA | Labels en elementos sin texto visible |

---

### 3.2 CSS

#### 3.2.1 Naming de Clases

**Patrón:** `.bloque-plataforma` o `.bloque__elemento-plataforma`

```css
/* CORRECTO */
.hero-title-desktop { }
.hero-title-mobile { }
.card-plan-desktop { }
.nav-link-desktop { }

/* INCORRECTO */
.heroTitleDesktop { }     /* camelCase prohibido */
.desktop-hero-title { }   /* plataforma primero prohibido */
.hero_title_desktop { }   /* underscores prohibido en CSS */
```

**Modificadores:**

```css
/* CORRECTO */
.card-plan-desktop { }
.card-plan-desktop.active { }
.card-plan-desktop.featured { }

/* INCORRECTO */
.card-plan-desktop--active { }  /* BEM completo no usado */
```

#### 3.2.2 Orden de Propiedades

Todas las declaraciones CSS deben seguir este orden:

```css
.selector {
    /* 1. Positioning */
    position: relative;
    top: 0;
    right: 0;
    z-index: 10;
    
    /* 2. Display & Box Model */
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1rem;
    margin: 0 auto;
    
    /* 3. Typography */
    font-family: var(--font-primary);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    color: var(--text-primary);
    text-align: left;
    
    /* 4. Visual */
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    
    /* 5. Animation */
    transition: all 0.3s ease;
    animation: fadeIn 0.5s;
}
```

#### 3.2.3 Variables CSS

Todas las propiedades visuales deben usar variables definidas en `_variables.css`:

```css
/* CORRECTO */
color: var(--text-primary);
background: var(--bg-card);
border-radius: var(--radius-md);
box-shadow: var(--shadow-lg);

/* INCORRECTO */
color: #333333;           /* Valor hardcodeado */
background: white;        /* Sin variable */
border-radius: 8px;       /* Valor mágico */
```

**Categorías de Variables:**
- `--color-*` : Paleta de colores
- `--text-*` : Colores de texto
- `--bg-*` : Colores de fondo
- `--border-*` : Bordes
- `--radius-*` : Border radius
- `--shadow-*` : Sombras
- `--font-*` : Tipografías
- `--spacing-*` : Espaciado
- `--z-*` : Z-index

#### 3.2.4 Formato de Comentarios

```css
/* ==================== */
/* NOMBRE DE SECCIÓN    */
/* ==================== */

/* Subsección o grupo de reglas */
.clase-uno {
    /* Explicación solo si no es obvio */
    property: value;
}

.clase-dos { }
```

#### 3.2.5 Prohibiciones CSS

| Prohibido | Razón | Alternativa |
|-----------|-------|-------------|
| `!important` | Rompe cascada | Aumentar especificidad |
| Inline styles | Inmantenible | Clases CSS |
| IDs para estilos | Especificidad alta | Clases |
| Valores hardcodeados | Inconsistencia | Variables CSS |
| Selectores anidados > 3 niveles | Fragilidad | Refactorizar |

**Excepciones permitidas:**
- `!important` solo en `prefers-reduced-motion` para accesibilidad
- `@media` queries dentro de archivos de componente si están encapsuladas (mejora mantenibilidad modular)

---

### 3.3 JavaScript

#### 3.3.1 Naming de Variables

```javascript
// Variables: camelCase
const userName = 'John';
const isActive = true;
let itemCount = 0;

// Constantes: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_TIMEOUT_MS = 5000;

// Clases: PascalCase
class UserProfile { }
class DataRenderer { }
```

#### 3.3.2 Naming de Funciones

```javascript
// Acciones: verbo + sustantivo
function loadComponent() { }
function renderContent() { }
function toggleMenu() { }
function validateForm() { }
function calculateTotal() { }

// Booleanos: is/has/can + condición
function isValid() { }
function hasPermission() { }
function canSubmit() { }

// INCORRECTO
function component() { }     // Sin verbo
function menu() { }          // Sin verbo
function valid() { }         // Debería ser isValid()
function get_user_data() { } // snake_case prohibido
```

#### 3.3.3 Naming de Exports (Data Files)

**Regla:** El nombre del export debe coincidir con el nombre del archivo.

```javascript
// Archivo: planes_data.js
export const planesData = [...];

// Archivo: testimonials.js
export const testimonialsData = [...];

// Archivo: proceso_content.js
export const procesoContent = {...};
```

**Patrón:** `nombre_archivo.js` → `nombreArchivoData` o `nombreArchivoContent`

#### 3.3.4 Logger Centralizado

**Ubicación:** `js/utils/logger.js`

**Uso obligatorio:**

```javascript
import { Logger } from './utils/logger.js';

// En desarrollo
Logger.log('Mensaje informativo');
Logger.info('Información adicional');

// Siempre visibles
Logger.warn('Advertencia');
Logger.error('Error crítico', errorObject);
```

**Prohibido:**
- `console.log()` directo en código de producción - **Excepción:** `console.log` solo dentro de `js/utils/logger.js` (wrapper pattern)
- `console.error()` sin contexto

**Configuración:**
- `DEBUG = false` en producción (silencia log/info)
- `DEBUG = true` en desarrollo (muestra todo)

#### 3.3.5 Funciones: Tamaño y Responsabilidad

**Regla del Tamaño:**
- Máximo 50 líneas por función
- Ideal: 20-30 líneas
- Si supera 50: refactorizar en subfunciones

**Regla de Responsabilidad Única:**
- Una función hace UNA cosa
- La hace BIEN
- La hace SOLAMENTE

```javascript
// CORRECTO: Responsabilidad única
function loadComponent(id, path) {
    return fetch(path)
        .then(response => response.text());
}

function insertComponent(id, html) {
    document.getElementById(id).innerHTML = html;
}

// INCORRECTO: Múltiples responsabilidades
function loadAndInsertAndAnimate(id, path) {
    // Carga + inserta + anima = 3 cosas
}
```

#### 3.3.6 Error Handling

**Patrón obligatorio:**

```javascript
// CORRECTO: Try/catch con Logger
async function loadData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        Logger.error('Failed to load data', error);
        return null; // o valor por defecto
    }
}

// CORRECTO: Validación temprana
function processUser(user) {
    if (!user) {
        Logger.warn('processUser called with null user');
        return;
    }
    // Continuar con lógica
}
```

**Prohibido:**
- Catch vacíos (`catch (e) { }`)
- Ignorar errores silenciosamente
- Retornar `undefined` sin intención

#### 3.3.7 Formato de Comentarios

```javascript
/* ===================================
   NOMBRE DEL MÓDULO
   Descripción breve de propósito
   =================================== */

/**
 * Descripción de la función
 * @param {string} selector - Descripción del parámetro
 * @returns {HTMLElement|null} Descripción del retorno
 */
function selectElement(selector) {
    // Comentario inline solo si es necesario
    return document.querySelector(selector);
}

// Comentario de una línea para explicaciones breves
const MAX_WIDTH = 1200; // en píxeles
```

**Prohibido:**
- Emojis en comentarios
- Comentarios que repiten el código
- TODOs sin plan de resolución

#### 3.3.8 ES6 Modules

**Obligatorio:**
- `import`/`export` para modularidad
- Un archivo = un módulo = una responsabilidad

```javascript
// CORRECTO: Named exports
export function initModule() { }
export const MODULE_CONFIG = { };

// CORRECTO: Import específico
import { initModule } from './module.js';

// EVITAR: Default exports (excepto casos justificados)
export default function() { } // Menos claro
```

#### 3.3.9 Prohibiciones JavaScript

| Prohibido | Razón | Alternativa |
|-----------|-------|-------------|
| Variables globales | Contamina namespace | Modules, closures |
| `var` | Scope confuso | `const`, `let` |
| `console.log` en prod | Ruido en consola | `Logger` |
| Funciones > 50 líneas | Inmantenible | Dividir |
| Callbacks anidados > 2 | Callback hell | async/await |
| `eval()` | Seguridad | Nunca usar |
| `document.write()` | Obsoleto | DOM manipulation |

---

### 3.4 Data Files

#### 3.4.1 Single Source of Truth

**Regla:** Todos los datos viven en `js/data/`. Cero datos hardcodeados en HTML o JS de UI.

```javascript
// js/data/planes_data.js
export const planesData = [
    {
        id: "joven",
        label: "Joven",
        icon: "fa-rocket",
        // ... resto de propiedades
    }
];
```

#### 3.4.2 Estructura para Variantes Desktop/Mobile

Cuando el contenido difiere por plataforma:

```javascript
// js/data/proceso_content.js
export const procesoContent = {
    desktop: {
        title: "Cómo Funciona",
        subtitle: "4 pasos simples para optimizar tu plan",
        steps: [...]
    },
    mobile: {
        title: "Cómo Funciona",
        subtitle: "4 pasos", // Más corto
        steps: [...]         // Puede tener menos elementos
    }
};
```

---

## PARTE IV: PATRÓN DE SEPARACIÓN DESKTOP/MOBILE

### 4.1 Principio Fundamental

**REGLA:** Desktop y Mobile son plataformas diferentes con UX, comportamiento e incluso contenido distinto. NUNCA mezclar en un mismo archivo.

### 4.2 Estructura por Plataforma

**Todas las capas se dividen:**

| Capa | Desktop | Mobile |
|------|---------|--------|
| HTML | `seccion-desktop.html` | `seccion-mobile.html` |
| CSS | `_seccion-desktop.css` | `_seccion-mobile.css` |
| JS (si difiere) | `modulo_desktop.js` | `modulo_mobile.js` |

**Ejemplo completo:**
```
partials/sections/
├── hero-desktop.html
├── hero-mobile.html

css/
├── _hero-desktop.css
├── _hero-mobile.css

js/modules/hero/
├── animation_desktop.js  (si comportamiento difiere)
├── touch_mobile.js
```

### 4.3 Naming Convention Obligatoria

| Tipo | Desktop | Mobile | Shared |
|------|---------|--------|--------|
| HTML | `name-desktop.html` | `name-mobile.html` | `name.html` |
| CSS | `_name-desktop.css` | `_name-mobile.css` | `_name.css` |
| CSS Class | `.element-desktop` | `.element-mobile` | `.element` |
| JS Module | `module_desktop.js` | `module_mobile.js` | `module.js` |

### 4.4 Decision Matrix

| Pregunta | Sí → Dividir | No → Compartir |
|----------|--------------|----------------|
| ¿Layout diferente? | Dividir | |
| ¿Interacción diferente (hover vs touch)? | Dividir | |
| ¿Contenido diferente (textos, elementos)? | Dividir | |
| ¿Solo utilidad/helper? | | Compartir |
| ¿Design tokens (colores, fuentes)? | | Compartir |

### 4.5 Excepciones Permitidas

**Archivos que NO se dividen:**

| Archivo | Razón |
|---------|-------|
| `_variables.css` | Design tokens universales |
| `_base.css` | Resets globales |
| `_animations.css` | Keyframes puros sin layout |
| `js/core/renderer.js` | Lógica de rendering universal |
| `js/utils/*.js` | Helpers agnósticos de plataforma |
| `js/data/*.js` | Datos (pueden tener variantes internas) |

### 4.6 Testing Checklist Desktop/Mobile

Antes de commit, verificar:

- [ ] Resize 861px → 860px: Header cambia a móvil
- [ ] Resize 721px → 720px: Contenido cambia a móvil
- [ ] Desktop renderiza correctamente (1920x1080)
- [ ] Mobile renderiza correctamente (375x667)
- [ ] Clases `.show-desktop` invisibles en mobile
- [ ] Clases `.show-mobile` invisibles en desktop
- [ ] No hay elementos huérfanos en ninguna vista

---

## PARTE V: PRINCIPIOS DE DISEÑO Y UX

### 5.1 Mobile-First

**Regla:** El diseño comienza por mobile, luego se expande a desktop.

**Implicaciones:**
- Mobile es la experiencia base
- Desktop añade features, no al revés
- Si algo no funciona en mobile, no se implementa

### 5.2 Claridad sobre Creatividad

**Regla:** La claridad siempre gana sobre la originalidad.

- Interfaces auto-evidentes, no solo "aprendibles"
- El usuario debe "entender" sin leer
- Cero fricción cognitiva

**Test:** Si hay que explicar un elemento, simplificarlo.

### 5.3 Jerarquía Visual

**Principios:**
- Un solo CTA primario por vista
- Contraste claro entre elementos
- Espaciado consistente (usar variables)
- Tipografía con escala definida

**Patrones de escaneo:**
- Desktop: F-pattern (izquierda a derecha, arriba a abajo)
- Mobile: Scroll vertical, CTAs prominentes

### 5.4 Navegación

**Requisitos:**
- El usuario siempre sabe dónde está
- El usuario sabe qué puede hacer
- El usuario sabe cómo volver

**Implementación:**
- Header persistente
- Menú claro y conciso
- Breadcrumbs si hay profundidad
- Links de retorno explícitos

### 5.5 Accesibilidad

| Área | Requisito | Valor |
|------|-----------|-------|
| Contraste texto | WCAG AA | 4.5:1 mínimo |
| Contraste UI | WCAG AA | 3:1 mínimo |
| Alt text | Imágenes informativas | Obligatorio |
| Focus | Visible | Outline claro |
| Keyboard | Navegable | Tab funcional |
| Touch targets | Tamaño | 44x44px mínimo |

### 5.6 Interacciones

| Tipo | Desktop | Mobile |
|------|---------|--------|
| Hover | `:hover` permitido | No usar |
| Click | `click` event | `click` (touch handled) |
| Gestures | Keyboard arrows | Swipe |
| Feedback | Cursor change | Visual feedback |

### 5.7 Trust Indicators

**Elementos obligatorios en landing:**
- Social proof (testimonios, números)
- Logos de clientes/partners
- Indicadores de seguridad
- Claridad en propuesta de valor

**Ubicación:**
- Above the fold: propuesta + CTA + trust mínimo
- Below: trust expandido, testimonios, casos

---

## PARTE VI: GIT WORKFLOW

### 6.1 Estrategia de Branches

| Branch | Propósito | Protección |
|--------|-----------|------------|
| `main` | Producción, deployable | Requiere PR + aprobación |
| `dev` | Desarrollo activo | Trabajo diario |
| `feature/*` | Features grandes | Temporal |
| `fix/*` | Correcciones | Temporal |

### 6.2 Flujo de Trabajo

```
1. Desarrollo en dev
   git checkout dev
   git pull origin dev
   [hacer cambios]
   git add .
   git commit -m "tipo: descripción"
   git push origin dev

2. Review por usuario
   [usuario revisa en dev]
   [usuario prueba funcionalidad]

3. Merge a main (solo tras aprobación)
   git checkout main
   git merge dev --no-ff
   git push origin main
```

### 6.3 Convención de Commits

**Formato:** `tipo: descripción breve`

| Tipo | Uso |
|------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios CSS/visuales |
| `refactor:` | Refactorización sin cambio funcional |
| `docs:` | Documentación |
| `chore:` | Mantenimiento |

**Ejemplos:**
```
feat: add hero section with dual layout
fix: correct logo fader timing issue
style: adjust button hover states
refactor: extract planes data to separate file
docs: update ARCHITECTURE.md breakpoints
chore: cleanup unused CSS classes
```

### 6.4 Criterios para Merge a Main

**Solo mergear si:**
- [ ] Feature completamente funcional
- [ ] Probado en mobile Y desktop
- [ ] Código cumple ARCHITECTURE.md
- [ ] Cero `!important`
- [ ] Cero `console.log`
- [ ] Usuario aprobó explícitamente
- [ ] No rompe features existentes

### 6.5 Dev vs Producción

| Aspecto | `dev` | `main` |
|---------|-------|--------|
| Console.logs | Permitido temporalmente | Prohibido |
| TODOs | Permitido | Prohibido |
| !important | Debugging temporal | Prohibido |
| Código incompleto | Permitido | Prohibido |

---

## PARTE VII: FUNCIONALIDADES CORE

### 7.1 Hero Section

**Componentes:**
- Title Animation (typing effect)
- Social Proof (avatars + bubble)
- Logo Fader (rotación de logos)
- Trust Pills

**Archivos:**
- `partials/sections/hero-desktop.html`
- `partials/sections/hero-mobile.html`
- `js/modules/hero/title_animation.js`
- `js/modules/hero/social_proof.js`
- `js/modules/hero/logo_fader.js`

### 7.2 Logo Fader

- Rotación automática cada 6 segundos
- Logos pre-cargados al inicio
- Transición fade entre logos
- Footer de sección Hero

### 7.3 Planes Section

**Estructura:**
- Grid de perfiles en desktop
- Cards scrolleables en mobile
- 6 perfiles: Joven, Familia, Compensado, Freelance, Maternidad, Voluntario

**Datos:** `js/data/planes_data.js`
**UI:** `js/modules/planes/planes_ui.js`

### 7.4 Sidebar Form

- Modal/sidebar responsivo
- Apertura via CTAs
- Validación futura
- Integración backend pendiente

---

## PARTE VIII: ANTI-PATTERNS PROHIBIDOS

### Lista Consolidada

| Prohibición | Categoría | Justificación |
|-------------|-----------|---------------|
| `!important` | CSS | Rompe cascada, indica problema de arquitectura |
| Inline styles | HTML | Inmantenible, no cacheable |
| Inline scripts | HTML | Seguridad, separación de concerns |
| `console.log` en prod | JS | Ruido en consola |
| Variables globales | JS | Contamina namespace |
| Funciones > 50 líneas | JS | Inmantenible |
| Archivos > 500 líneas | General | Dividir en módulos |
| Nombres crípticos | General | `x`, `temp`, `data` prohibidos |
| Comentarios de código malo | General | Mejorar el código, no explicarlo |
| TODOs sin plan | General | Crear issue o resolver |
| Data hardcodeada | General | Centralizar en `js/data/` |
| Media queries mezclados | CSS | Usar archivos separados |
| Callbacks > 2 niveles | JS | Usar async/await |
| Selectores > 3 niveles | CSS | Refactorizar |

### Code Smells a Detectar

| Smell | Síntoma | Acción |
|-------|---------|--------|
| Long Method | Función > 50 líneas | Dividir |
| Large Class | Archivo > 500 líneas | Modularizar |
| Duplicate Code | Código repetido | Extraer helper |
| Dead Code | Código no usado | Eliminar |
| Feature Envy | Función usa más datos de otro módulo | Mover |
| Primitive Obsession | Muchos params primitivos | Crear objeto |

---

## PARTE IX: MÉTRICAS Y PERFORMANCE

### 9.1 Performance Targets

| Métrica | Target | Herramienta |
|---------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Total JS Size | < 100KB | Network tab |
| Total CSS Size | < 50KB | Network tab |

### 9.2 Performance Budgets

| Recurso | Límite |
|---------|--------|
| Imagen hero | < 200KB |
| Imagen secundaria | < 100KB |
| Single JS module | < 15KB |
| Single CSS file | < 10KB |
| Fuentes | < 100KB total |

### 9.3 Código Targets

| Métrica | Target |
|---------|--------|
| Complejidad ciclomática | < 10 por función |
| Cobertura de comentarios | < 5% (código auto-explicativo) |
| Duplicación | 0% |
| Funciones > 50 líneas | 0 |
| Archivos > 500 líneas | 0 |

---

## PARTE X: TESTING (FUTURO)

### 10.1 Estructura de Tests

**Cuando se implementen tests, seguir:**

**Principios FIRST:**
- **F**ast: Tests rápidos
- **I**ndependent: Sin dependencias entre tests
- **R**epeatable: Mismo resultado siempre
- **S**elf-validating: Pass/Fail claro
- **T**imely: Escritos antes o junto al código

**Naming:**
```javascript
// Patrón: describe_when_then
test('loadComponent_whenPathValid_returnsHTML')
test('renderPlanes_whenDataEmpty_showsEmptyState')
```

### 10.2 Cobertura Recomendada

| Tipo | Prioridad | Cobertura Target |
|------|-----------|------------------|
| Utils/Helpers | Alta | 90%+ |
| Core Logic | Alta | 80%+ |
| UI Modules | Media | 60%+ |
| Integration | Media | Paths críticos |

---

## PARTE XI: ESCALABILIDAD (FUTURO)

### 11.1 API Integration Patterns

**Cuando se agregue backend:**

```javascript
// Patrón: Wrapper/Adapter
// js/api/client.js
export const ApiClient = {
    async get(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            Logger.error('API Error', error);
            throw error;
        }
    }
};

// Uso en módulos
import { ApiClient } from '../api/client.js';
const data = await ApiClient.get('/planes');
```

### 11.2 State Management

**Si la app crece en interactividad:**

```javascript
// Patrón simple: Store centralizado
// js/core/store.js
const state = {
    user: null,
    selectedPlan: null
};

export const Store = {
    get(key) { return state[key]; },
    set(key, value) { 
        state[key] = value;
        // Notificar observers si se implementa
    }
};
```

### 11.3 Component Lifecycle

**Patrón para módulos complejos:**

```javascript
export const MyModule = {
    init() {
        // Setup inicial
        this.bindEvents();
        this.render();
    },
    
    bindEvents() {
        // Event listeners
    },
    
    render() {
        // Render inicial
    },
    
    update(data) {
        // Re-render con nuevos datos
    },
    
    destroy() {
        // Cleanup: remove listeners, clear intervals
    }
};
```

---

## PARTE XII: CHECKLIST PRE-COMMIT

### Antes de cada commit, verificar:

**Código:**
- [ ] Sin `!important` en CSS
- [ ] Sin `console.log` (usar Logger)
- [ ] Sin inline styles/scripts
- [ ] Funciones < 50 líneas
- [ ] Naming correcto (camelCase, etc.)

**Estructura:**
- [ ] Archivos en carpeta correcta
- [ ] Naming de archivos correcto
- [ ] Desktop/Mobile separados si aplica

**Funcionalidad:**
- [ ] Funciona en desktop (1920x1080)
- [ ] Funciona en mobile (375x667)
- [ ] No rompe features existentes

**Documentación:**
- [ ] Comentarios necesarios presentes
- [ ] Sin TODOs sin resolver
- [ ] ARCHITECTURE.md actualizado si hay cambios estructurales

---

## REFERENCIAS

Este documento está basado en principios de:

- **Clean Code** (Robert C. Martin) - Arquitectura y calidad de código
- **Don't Make Me Think** (Steve Krug) - Usabilidad y UX
- **Hacking Growth** (Sean Ellis) - Patrones de crecimiento

---

**Fin de ARCHITECTURE.md - Versión 2.0**
