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
├── index.html               # HTML puro (cero inline)
├── nosotros.html
├── asesores.html
├── noticias.html
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
│   ├── _layout.css          # Grid, containers
│   ├── _components.css      # Botones, cards, inputs
│   ├── _header-footer.css
│   ├── _animations.css
│   ├── _home-page.css
│   ├── _nosotros-page.css
│   ├── _asesores-page.css
│   └── _responsive.css      # Media queries
│
└── js/
    ├── main.js              # Orquestador
    │
    ├── core/
    │   ├── config.js
    │   └── state.js
    │
    ├── data/
    │   ├── planes_data.js
    │   ├── testimonials_data.js
    │   └── asesores_data.js
    │
    ├── modules/             # Componentes UI
    │   ├── hero/
    │   ├── planes_slider/
    │   ├── comparison_widget/
    │   ├── logo_fader/
    │   ├── testimonials/
    │   ├── casosDeExito/
    │   └── sidebar_form/
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
