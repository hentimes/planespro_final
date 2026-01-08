# ARCHITECTURE.md - PlanesPro Final
**Versión:** 1.0  
**Fecha:** 2025-12-27  
**Estado:** DOCUMENTO MAESTRO - LEY DEL PROYECTO

---

## 🎯 PROPÓSITO DE ESTE DOCUMENTO

Este archivo es la **constitución técnica** de `planespro_final`. Toda decisión de código, diseño, estructura, o contenido debe validarse contra este documento ANTES de su implementación.

---

## 📚 FUENTES DE CONOCIMIENTO (Context)

Ubicación: `C:\Users\henti\Documents\PLANESPRO\context\`

### Los 4 Expertos
1. **ARCH.txt** - Arquitectura y Clean Code (Robert C. Martin)
2. **UXI.txt** - Usabilidad y UX (Steve Krug - "No me hagas pensar")
3. **PROD.txt** - Producto y Estrategia (The Product Book)
4. **GROW.txt** - Marketing y Crecimiento (Seth Godin, Hacking Growth, Digital Marketing)

### Jerarquía de Decisión
```
PROD (estrategia, alcance)
  ↓
UXI (experiencia, claridad)
  ↓
GROW (mensajes, conversión)
  ↓
ARCH (implementación técnica)
```

---

## 🏗️ ESTRUCTURA DE DIRECTORIOS

```
planespro_final/
├── ARCHITECTURE.md          # Este archivo
├── README.md
├── .gitignore
│
├── index.html               # Orquestador mínimo (~40 líneas)
├── nosotros.html
├── asesores.html
├── noticias.html
│
├── partials/                # ⭐ COMPONENTES HTML REUTILIZABLES
│   ├── header.html          # Header compartido (todas las páginas)
│   ├── footer.html          # Footer compartido
│   └── sections/            # Secciones de index.html
│       ├── hero.html
│       ├── proceso.html
│       ├── planes.html
│       ├── casos.html
│       └── testimonios.html
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── logos/
│   │   ├── logos_isapre/
│   │   └── logos_pp/
│   └── ilustraciones/
│
├── css/                     # Arquitectura CSS (Partials)
│   ├── styles.css           # Maestro (@imports)
│   ├── _variables.css       # Tokens (colores, fuentes)
│   ├── _base.css            # Resets, tipografía
│   ├── _layout-desktop.css  # Grid, containers (Desktop)
│   ├── _layout-mobile.css   # Grid, containers (Mobile)
│   ├── _components.css      # Botones, cards, inputs
│   ├── _header-desktop.css  # Header desktop (glassmorphism)
│   ├── _header-mobile.css   # Header mobile
│   ├── _hero-desktop.css    # Hero desktop
│   ├── _hero-mobile.css     # Hero mobile
│   ├── _planes-desktop.css  # Planes desktop
│   ├── _planes-mobile.css   # Planes mobile
│   ├── _proceso-desktop.css # Proceso desktop
│   ├── _proceso-mobile.css  # Proceso mobile
│   ├── _animations.css
│   └── _responsive.css      # Media queries globales
│
└── js/
    ├── main.js              # Orquestador
    ├── loader.js            # ⭐ Carga HTML partials
    │
    ├── core/
    │   ├── config.js
    │   └── state.js
    │
    ├── data/
    │   ├── header_content.js
    │   ├── hero_content.js
    │   ├── planes_data.js
    │   ├── testimonials.js
    │   └── proceso_content.js
    │
    ├── modules/             # Componentes UI
    │   ├── header/
    │   │   └── mobile_menu.js
    │   ├── hero/
    │   │   ├── benefit_accordion.js
    │   │   ├── logo_fader.js
    │   │   ├── social_proof.js
    │   │   └── title_animation.js
    │   ├── planes/
    │   │   └── planes_ui.js
    │   └── ui/               # (Empty - reserved for future shared UI)
    │
    └── utils/
        ├── dom_helpers.js
        ├── formatters.js
        └── animations.js
```

---

## ⚖️ REGLAS ABSOLUTAS

### 1. HTML
- ✅ **Solo estructura semántica**
- ❌ Cero `onclick=""`, `style=""`, o JavaScript inline
- ❌ Cero CSS inline
- ✅ Atributos `data-*` para JS hooks
- ✅ ARIA labels para accesibilidad

### 2. CSS
- ✅ Arquitectura de **partials** (`@import` en `styles.css`)
- ✅ Mobile-first (UXI Cap. 13)
- ✅ Naming: BEM simplificado (`.block__element--modifier`)
- ❌ **PROHIBIDO `!important`** - Todo debe resolverse orgánicamente via especificidad
  - ⚠️ Solo permitido temporalmente para debugging (debe eliminarse antes de commit)
  - Si necesitas `!important`, la arquitectura CSS está mal → refactorizar
- ✅ Variables CSS para tokens de diseño

### 3. JavaScript
- ✅ **Un archivo, una responsabilidad** (ARCH Cap. 10)
- ✅ Funciones pequeñas (ARCH Cap. 3)
- ✅ Naming: `camelCase` para funciones/variables, `PascalCase` para clases
- ✅ ES6 modules (`import/export`)
- ❌ Cero variables globales no justificadas
- ✅ Event delegation sobre listeners individuales

### 4. Data
- ✅ **Single Source of Truth** en `js/data/`
- ❌ Cero data hardcodeada en HTML o CSS
- ✅ Estructuras JSON claras y documentadas

---

## 🚨 CHECKLIST PRE-CAMBIO OBLIGATORIO

Antes de escribir **cualquier línea de código**, validar:

```
[ ] ¿Consulté ARCH para arquitectura/naming?
[ ] ¿Consulté UXI para diseño/usabilidad?
[ ] ¿Consulté GROW si escribo texto/copy?
[ ] ¿Consulté PROD si afecta alcance/funcionalidad?
[ ] ¿El cambio respeta la estructura de directorios?
[ ] ¿El archivo va en la carpeta correcta?
[ ] ¿El naming es descriptivo y consistente?
[ ] ¿Código limpio (funciones pequeñas, cero duplicación)?
[ ] ¿Mobile-first considerado?
[ ] ¿Accesibilidad considerada?
```

**Si un checklist falla → DETENER y ajustar.**

---

## 🎨 DECISIONES DE DISEÑO CLAVE

### Responsive Strategy: **Componentes Duales**
```html
<section class="hero">
    <div class="hero__desktop"><!-- Desktop UI --></div>
    <div class="hero__mobile"><!-- Mobile UI --></div>
</section>
```

**Justificación:** ARCH (DRY, mantenibilidad), UXI (mobile-first, accesibilidad), PROD (métricas unificadas), GROW (SEO, cero friction).


---

## 🔒 PATRÓN DE SEPARACIÓN TOTAL DESKTOP/MOBILE

**PRINCIPIO FUNDAMENTAL:** Desktop y Mobile son **plataformas diferentes** con UX, comportamiento e incluso secciones distintas. NUNCA mezclar en un mismo archivo.

### Breakpoint Único
### Breakpoints (Hybrid Strategy)
- **Header Breakpoint:** `860px` (Menú hamburguesa aparece antes para evitar colisiones)
- **Content Breakpoint:** `720px` (Cambio de layout principal Hero/Grid)
- **Tablet State (Hybrid):** Entre `720px` y `860px` (Header móvil + Contenido desktop)


### Regla de Oro: SEPARACIÓN TOTAL

**TODAS las capas se dividen en desktop/mobile:**

```
✅ CORRECTO:
HTML:   proceso-desktop.html + proceso-mobile.html
CSS:    _proceso-desktop.css + _proceso-mobile.css
JS:     proceso_desktop.js + proceso_mobile.js
Data:   procesoData = { desktop: {...}, mobile: {...} }

❌ INCORRECTO:
HTML:   proceso.html (con ambas versiones)
CSS:    _proceso.css (con @media queries mezclados)
JS:     proceso.js (con if/else desktop/mobile)
```

### Estructura de Archivos

#### HTML Partials
```
partials/sections/
├── hero-desktop.html
├── hero-mobile.html
├── proceso-desktop.html
├── proceso-mobile.html
├── planes-desktop.html
└── planes-mobile.html
```

#### CSS
```
css/
├── _variables.css           # SHARED (design tokens)
├── _base.css                # SHARED (resets)
├── _animations.css          # SHARED (keyframes puros)
├── _layout-desktop.css      # Desktop layout
├── _layout-mobile.css       # Mobile layout
├── _components.css          # Shared component base
├── _components-mobile.css   # Mobile-specific adjustments
├── _header-desktop.css
├── _header-mobile.css
├── _home-desktop.css
├── _home-mobile.css
├── _proceso-desktop.css
├── _proceso-mobile.css
└── _responsive.css          # Final tweaks only
```

#### JavaScript Modules
```
js/modules/
├── planes/
│   ├── slider_desktop.js    # Desktop: arrows, hover
│   └── slider_mobile.js     # Mobile: touch swipe
├── proceso/
│   ├── flip_cards_desktop.js  # Desktop: flip on hover
│   └── static_mobile.js       # Mobile: no interaction
└── testimonials/
    ├── carousel_desktop.js
    └── swipe_mobile.js
```

#### Data Files
```javascript
// js/data/proceso_content.js
export const procesoContent = {
    desktop: {
        title: "Cómo Funciona",
        subtitle: "4 pasos simples...",
        // Desktop-specific content
    },
    mobile: {
        title: "Cómo Funciona",
        subtitle: "4 pasos",
        // Mobile-specific (shorter)
    }
};
```

### Naming Convention (OBLIGATORIO)

**HTML Files:**
- Desktop: `section-desktop.html`
- Mobile: `section-mobile.html`

**CSS Files:**
- Desktop: `_section-desktop.css`
- Mobile: `_section-mobile.css`

**CSS Classes:**
- Desktop: `.hero-grid-desktop`, `.hero-text-desktop`
- Mobile: `.hero-stack-mobile`, `.hero-text-mobile`

**JS Modules:**
- Desktop: `module_desktop.js`
- Mobile: `module_mobile.js`
- Shared utilities: `helpers.js` (sin sufijo)

**JS Functions:**
```javascript
// Desktop module
export function initDesktopSlider() { }

// Mobile module
export function initMobileSlider() { }
```

### Loader Pattern (Condicional)

```javascript
// loader.js
async function loadAllComponents() {
    const isMobile = window.innerWidth <= 768;
    
    // Load header (desktop + mobile)
    await loadComponent('header-placeholder', 'partials/header.html');
    
    // Load platform-specific sections
    if (isMobile) {
        await loadComponent('hero-placeholder', 'partials/sections/hero-mobile.html');
        await loadComponent('proceso-placeholder', 'partials/sections/proceso-mobile.html');
    } else {
        await loadComponent('hero-placeholder', 'partials/sections/hero-desktop.html');
        await loadComponent('proceso-placeholder', 'partials/sections/proceso-desktop.html');
    }
}

async function initializeModules() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const { initMobileMenu } = await import('./modules/header/mobile_menu.js');
        const { initMobileSlider } = await import('./modules/planes/slider_mobile.js');
        initMobileMenu();
        initMobileSlider();
    } else {
        const { initDesktopSlider } = await import('./modules/planes/slider_desktop.js');
        const { initFlipCards } = await import('./modules/proceso/flip_cards_desktop.js');
        initDesktopSlider();
        initFlipCards();
    }
}
```

### Decision Matrix: ¿Cuándo Dividir?

| Layer | Split? | Reason |
|-------|--------|---------|
| **HTML** | ✅ ALWAYS | Different structure, content length, UX |
| **CSS** | ✅ ALWAYS | Different visual design per platform |
| **JS Interactive** | ✅ ALWAYS | Different behaviors (hover vs touch) |
| **Data** | ✅ Variants | Desktop/mobile properties in same file |
| **Utilities** | ❌ NEVER | Platform-agnostic helpers |
| **Core** | ❌ NEVER | Rendering/orchestration logic |

### Excepciones PERMITIDAS

**Archivos que NO se dividen:**

1. **`_variables.css`** - Design tokens (pueden tener @media para responsive typography)
2. **`_base.css`** - Resets globales (solo @media para prefers-reduced-motion)
3. **`_animations.css`** - Keyframes puros (sin @media)
4. **`js/core/renderer.js`** - Lógica de rendering universal
5. **`js/utils/dom_helpers.js`** - Utilidades DOM agnósticas

### Por Qué Esta Separación

**Ventajas:**
1. **Cambios independientes** - Modificar desktop sin tocar mobile
2. **Efectos diferentes** - Desktop hover, mobile touch
3. **Secciones exclusivas** - Mobile puede tener secciones que desktop no
4. **Mantenibilidad** - Archivos más pequeños, enfoque claro
5. **Performance** - Loader solo carga lo necesario por plataforma
6. **Escalabilidad total** - Agregar features sin afectar la otra plataforma

**Ejemplos Reales:**
- Desktop: Planes en grid 3x2 con comparison modal
- Mobile: Planes en swiper horizontal, sin comparison
- Desktop: Proceso con flip cards hover
- Mobile: Proceso con steps estáticos verticales
- Ejemplo: `.hero-stack-mobile`, `.hero-title-mobile`

**Regla:** NUNCA compartir clases entre desktop y mobile (excepto utilitarias).

### HTML Structure

**Desktop primero (SEO):**
```html
<section id="hero">
    <div class="hero__desktop show-desktop">
        <!-- Todo el contenido desktop aquí -->
    </div>
    <div class="hero__mobile show-mobile">
        <!-- Todo el contenido mobile aquí -->
    </div>
</section>
```

### Imágenes Responsive

**Crear 2 versiones:**
- `image-large.png` (desktop, >1MB OK)
- `image-small.png` (mobile, <300KB, WebP)

### Interacciones

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Hover | ✅ `:hover` permitido | ❌ Usar `:active` |
| Click | `click` event | `touchstart`/`touchend` |
| Gestures | Keyboard arrows | Swipe gestures |

### Contenido Condicional

**Mobile puede tener:**
- Textos abreviados
- Menos elementos
- Estructura simplificada

**Regla:** Mobile = Lightweight, Desktop = Feature-rich

### Testing Checklist (Pre-Commit)

- [ ] Desktop (1920x1080)
- [ ] Mobile (375x667 - iPhone SE)
- [ ] Resize window (769 → 768 debe cambiar versión)
- [ ] `.show-desktop` invisible en mobile
- [ ] `.show-mobile` invisible en desktop

---

### Scroll Behavior: **Scroll Snap**
```css
.snap-container {
    scroll-snap-type: y mandatory;
}
.snap-section {
    scroll-snap-align: start;
    height: 100vh;
}
```

### Secciones (index.html)
1. **Hero** (100vh) - Texto + CTA + Trust Pills + Logo Fader (footer de sección)
2. **Proceso** (100vh) - Flip cards
3. **Planes** (100vh) - Grid perfiles + Comparación + Footer sticky
4. **Casos de Éxito** (100vh) - Slider
5. **Testimonios** (100vh) - Lo que dicen nuestros clientes
6. **CTA Final + Footer** (100vh)

---

## 🔄 WORKFLOW DE DESARROLLO

### Git Branches Strategy

**Ramas Principales:**
- `main` - **PRODUCCIÓN** (código aprobado, funcional, deployable)
  - Protegida: requiere pull request + aprobación del usuario
  - Solo código 100% testeado y validado
  - Representa versión "deployable" en cualquier momento
  
- `dev` - **DESARROLLO** (trabajo activo, iteraciones)
  - Rama de trabajo principal del desarrollador
  - Permite experimentación y pruebas
  - Código funcional pero en validación

**Ramas Temporales (opcional):**
- `feature/nombre-feature` - Para features grandes que requieren múltiples sesiones
- `fix/nombre-bug` - Para correcciones específicas
- `test/nombre-experimento` - Para pruebas que pueden descartarse

### Flujo de Trabajo

1. **Desarrollo en `dev`:**
   ```bash
   # Siempre trabajar en dev
   git checkout dev
   git pull origin dev
   
   # Hacer cambios
   # Probar localmente
   # Commit
   git add .
   git commit -m "feat: add hero section desktop layout"
   git push origin dev
   ```

2. **Revisión del Usuario:**
   - Desarrollador notifica que feature está lista
   - Usuario revisa código y funcionalidad
   - Usuario prueba en `dev` branch

3. **Merge a `main` (solo tras aprobación):**
   ```bash
   # Usuario aprueba
   git checkout main
   git merge dev --no-ff  # No fast-forward (preserva historial)
   git push origin main
   ```

4. **Tags para Releases (opcional):**
   ```bash
   # Al completar milestone importante
   git tag -a v1.0.0 -m "Release: Hero + Proceso sections"
   git push origin v1.0.0
   ```

### Convención de Commits

**Formato:** `tipo: descripción breve`

**Tipos:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `style:` - Cambios de CSS/estilos
- `refactor:` - Refactorización sin cambio funcional
- `docs:` - Documentación
- `test:` - Pruebas
- `chore:` - Tareas de mantenimiento

**Ejemplos:**
```
feat: add hero section with dual layout
fix: correct logo fader rotation timing
style: adjust button hover states
refactor: extract planes data to separate file
docs: update ARCHITECTURE.md with Git workflow
```

**Reglas de Commit:**
- ✅ Commits pequeños y atómicos (un cambio lógico por commit)
- ✅ Mensaje descriptivo (qué + por qué si no es obvio)
- ❌ No commitear código con `!important` (debugging)
- ❌ No commitear console.logs de prueba
- ❌ No commitear archivos de configuración personal (.vscode/)

### Desarrollo vs Producción

**`dev` (Desarrollo):**
- Permite código en progreso
- Permite console.logs temporales
- Permite comentarios de debugging
- Validación en curso

**`main` (Producción):**
- Solo código limpio y finalizado
- Cero console.logs
- Cero TODOs sin resolver
- Cero `!important`
- Validado por usuario
- Performance optimizada

### Criterios para Merge a `main`

**Solo mergear si:**
- ✅ Feature completamente funcional
- ✅ Probado en mobile y desktop
- ✅ Código pasa `ARCHITECTURE.md`
- ✅ Cero `!important` en código final
- ✅ Cero console.logs
- ✅ Usuario aprobó explícitamente
- ✅ No rompe features existentes

**Si falla un criterio → continuar en `dev`**

---

## 🧪 FUNCIONALIDADES CORE

### Planes Slider
- Auto-rotation cada 4s (hasta interacción)
- 6 perfiles (Joven, Familia, Compensado, Freelance, Maternidad, Voluntario)
- Botón "Ver vs Fonasa" → abre comparison widget
- Tabs: GES, CAEC, Reembolsos

### Comparison Widget
- Tabla interactiva Fonasa vs Isapre
- Hover sobre categorías → explicación dinámica
- Animación `fadeInMoveUp` al abrir

### Logo Fader
- Rotación cada 6s
- Logos pre-cargados al inicio
- Footer de sección Hero

### Sidebar Form
- Modal/sidebar responsivo
- Validación en tiempo real
- Integración con backend (futuro)

---

## 🎯 PRINCIPIOS DE CÓDIGO

### ARCH (Clean Code)
- Funciones: máx 20 líneas
- Clases: una responsabilidad
- Naming: auto-explicativo
- Cero comentarios innecesarios

### UXI (Usabilidad)
- Cero fricción cognitiva
- Jerarquía visual clara
- Mobile-first
- Accesibilidad (WCAG básico)

### PROD (Producto)
- Cada feature debe tener métrica de éxito
- MVP antes de escalar
- Validar antes de construir

### GROW (Marketing)
- Copy claro y directo
- Mensajes consistentes
- Trust signals visibles
- Optimización de conversión

---

## 🚫 ANTI-PATTERNS PROHIBIDOS

❌ Código espagueti (lógica mezclada)  
❌ Duplicación de data  
❌ Variables globales sin justificación  
❌ CSS inline  
❌ JavaScript inline  
❌ Funciones >50 líneas  
❌ Nombres crípticos (`x`, `temp`, `data`)  
❌ Comentarios que explican código malo  
❌ `!important` (NUNCA - resolver con especificidad)  
❌ Archivos >500 líneas  
❌ console.logs en código final (solo debugging temporal)  
❌ TODOs sin issue/plan de resolución  

---

## 🔍 COMANDO DE EMERGENCIA

Si detectas violación de arquitectura:
```
Usuario dice: "ARCH"
→ Detenerse inmediatamente
→ Validar contra este documento
→ Justificar o corregir
```

---

## 📊 MÉTRICAS DE CALIDAD

### Código
- Complejidad ciclomática: <10 por función
- Cobertura de comentarios: <5% (código auto-explicativo)
- Duplicación: 0%

### Performance
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1

### Accesibilidad
- WCAG 2.1 AA mínimo
- Contraste: 4.5:1 texto, 3:1 UI
- Keyboard navigation: 100%

---

## 🎓 REFERENCIAS

- Clean Code (Robert C. Martin) → ARCH
- Don't Make Me Think (Steve Krug) → UXI
- The Product Book (Product School) → PROD
- Esto es Marketing (Seth Godin) → GROW
- Hacking Growth (Sean Ellis) → GROW

---

**Fin de ARCHITECTURE.md - Versión 1.0**
