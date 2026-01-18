# 🌙 Dark Mode - Preparación y Checklist

**Fecha de creación**: 2026-01-12  
**Estado**: PREPARACIÓN (no implementado aún)  
**Prioridad**: Futura feature

---

## ⚠️ CRÍTICO: Cambios Obligatorios ANTES de Dark Mode

### 1. **Migrar Transparencias rgba() a Variables RGB** (BLOQUEANTE)

**Problema actual**: 64 usos de `rgba()` hardcodeados en CSS

**Ubicación**: `_hero-desktop.css`, `_perfiles-desktop.css`, `_proceso-desktop.css`, `_components.css`

**Ejemplos actuales**:
```css
/* ❌ ACTUAL (no funciona con dark mode) */
box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
background: rgba(255, 255, 255, 0.95);
border: 1px solid rgba(37, 99, 235, 0.12);
```

**✅ SOLUCIÓN: Crear variables RGB**

#### Paso 1: Agregar en `_variables.css`

```css
/* === RGB Values (for rgba() with opacity) === */
/* Colors principales */
--rgb-primary: 37, 99, 235;        /* #2563eb */
--rgb-primary-dark: 30, 64, 175;   /* #1e40af */
--rgb-white: 255, 255, 255;
--rgb-black: 0, 0, 0;

/* Opacidades estándar */
--opacity-subtle: 0.04;
--opacity-light: 0.08;
--opacity-medium: 0.15;
--opacity-strong: 0.25;
--opacity-intense: 0.35;
--opacity-overlay: 0.95;
```

#### Paso 2: Reemplazar en archivos CSS

```css
/* ✅ NUEVO (funciona con dark mode) */
box-shadow: 0 4px 12px rgba(var(--rgb-primary), var(--opacity-light));
background: rgba(var(--rgb-white), var(--opacity-overlay));
border: 1px solid rgba(var(--rgb-primary), 0.12);
```

#### Paso 3: Buscar y reemplazar (64 ocurrencias)

**Comando de búsqueda (regex)**:
```regex
rgba\(37, 99, 235,  → rgba(var(--rgb-primary),
rgba\(255, 255, 255, → rgba(var(--rgb-white),
rgba\(0, 0, 0,       → rgba(var(--rgb-black),
```

**Archivos a modificar**:
- `_hero-desktop.css` (~40 ocurrencias)
- `_perfiles-desktop.css` (~15 ocurrencias)
- `_proceso-desktop.css` (~5 ocurrencias)
- `_components.css` (~4 ocurrencias)

---

## 🎨 Dark Mode: Estrategia de Implementación

### Enfoque: CSS Variables con `prefers-color-scheme`

```css
/* _variables.css */
:root {
    /* Light mode (default) */
    --color-bg-primary: #ffffff;
    --color-text-primary: #1a252f;
    --rgb-bg: 255, 255, 255;
    --rgb-text: 26, 37, 47;
}

@media (prefers-color-scheme: dark) {
    :root {
        /* Dark mode overrides */
        --color-bg-primary: #1a1a1a;
        --color-text-primary: #e5e5e5;
        --rgb-bg: 26, 26, 26;
        --rgb-text: 229, 229, 229;
    }
}
```

---

## 📋 Checklist Completo para Dark Mode

### Fase 1: Preparación (Antes de escribir código dark mode)

- [ ] **Migrar 64 rgba() a variables RGB** ⚠️ CRÍTICO
- [ ] Verificar que todos los colores usan variables (actualmente 100% ✅)
- [ ] Auditar imágenes (¿necesitan versión dark?)
- [ ] Auditar logos (¿cambiar a blanco en dark mode?)

### Fase 2: Crear Variables Dark Mode

- [ ] Definir paleta dark en `_variables.css`
- [ ] Crear override con `@media (prefers-color-scheme: dark)`
- [ ] Definir `--rgb-*` para todos los colores principales
- [ ] Crear variables específicas dark (ej: `--color-surface-dark`)

### Fase 3: Ajustar Componentes

- [ ] Hero: Gradientes de fondo
- [ ] Header: Background y texto
- [ ] Cards: Sombras y borders
- [ ] Buttons: Verificar contraste
- [ ] Forms: Inputs y placeholders

### Fase 4: Testing

- [ ] Probar en Chrome DevTools (Force dark mode)
- [ ] Verificar contraste WCAG AAA (ratio ≥7:1)
- [ ] Probar transición light/dark sin flash
- [ ] Validar en todos los navegadores

---

## 🔧 Herramientas Recomendadas

**Para testing**:
- Chrome DevTools → Rendering → Emulate `prefers-color-scheme: dark`
- Firefox DevTools → Inspector → Simulate color scheme
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Para generar paleta dark**:
- [Coolors Dark Palette Generator](https://coolors.co/)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)

---

## 🚨 Recordatorios Importantes

1. **NO implementar dark mode hasta migrar rgba()** - Causará bugs visuales
2. **Probar en incógnito** - No confiar en cache del navegador
3. **Mantener WCAG AAA** - Contraste mínimo 7:1
4. **Agregar toggle manual** - No solo `prefers-color-scheme` (algunos usuarios prefieren elegir)

---

## 📊 Estimación de Tiempo

| Tarea | Tiempo Estimado |
|-------|-----------------|
| Migrar 64 rgba() a variables RGB | 2-3 horas |
| Crear paleta dark mode | 1 hora |
| Implementar variables dark | 2 horas |
| Ajustar componentes | 3-4 horas |
| Testing y ajustes | 2 horas |
| **TOTAL** | **10-12 horas** |

---

## 💡 Próximos Pasos (Cuando decidas implementar)

1. Abrir este documento
2. Ejecutar Fase 1 completa (migración rgba)
3. Avisar cuando termines Fase 1 para continuar con Fase 2

**Última actualización**: 2026-01-12  
**Responsable**: Antigravity AI + Usuario
