# 🔒 Workflow Obligatorio: Code Quality Gate

**Estado**: OBLIGATORIO - Debe cumplirse en TODAS las ediciones de código  
**Fecha de establecimiento**: 2026-01-12  
**Prioridad**: CRÍTICA

---

## 📋 REGLA DE ORO

> **"NINGÚN código se escribe sin revisar ARCHITECTURE.md y SEO_Estado_Actual.md ANTES y DESPUÉS"**

---

## 🔄 Proceso Obligatorio (3 Fases)

### **FASE 1: PRE-CODE (ANTES de escribir código)**

#### 1.1 Leer Secciones Relevantes

**Archivos a revisar**:
- [ ] `ARCHITECTURE.md` - Secciones aplicables al cambio
- [ ] `SEO_Estado_Actual.md` - Requisitos de performance/SEO

**¿Qué buscar?**:
- ✅ Naming conventions (sección 2.2, 3.2.1, 3.3.1)
- ✅ Prohibiciones CSS/JS/HTML (secciones 3.1.1, 3.2.5, 3.3.9)
- ✅ Uso de variables obligatorio (sección 3.2.3)
- ✅ Modularización requerida (sección 2.1, 2.3)
- ✅ Performance targets (SEO_Estado_Actual.md líneas 161-169)

#### 1.2 Planificar con Estándares en Mente

**Antes de escribir UNA SOLA LÍNEA**:
- [ ] ¿Qué variables CSS necesito?
- [ ] ¿Cumple con naming conventions?
- [ ] ¿Usa clases o IDs para estilos? (solo clases permitido)
- [ ] ¿Necesito `!important`? (prohibido excepto `prefers-reduced-motion`)
- [ ] ¿El JS usa ES6 modules? (obligatorio)
- [ ] ¿Usa `Logger` en lugar de `console.log`? (obligatorio)

---

### **FASE 2: CODE (Durante escritura)**

#### 2.1 Escribir Código

- ✅ Seguir convenciones identificadas en Fase 1
- ✅ Usar variables CSS existentes
- ✅ Importar módulos correctamente
- ✅ Comentar decisiones no obvias

#### 2.2 Auto-verificación Continua

Mientras escribes, pregúntate:
- ¿Estoy usando `var(--variable-name)` para colores/spacing?
- ¿Los nombres de clases siguen `.bloque-plataforma` o `.bloque__elemento-plataforma`?
- ¿Estoy usando `const`/`let` en lugar de `var`?
- ¿Importé el `Logger` si uso logs?

---

### **FASE 3: POST-CODE (DESPUÉS de escribir código)**

#### 3.1 Primera Revisión (Inmediata)

**Checklist obligatorio**:
- [ ] Buscar `!important` → ¿Está en archivo correcto? (solo `_base.css` + `prefers-reduced-motion`)
- [ ] Buscar `var ` en JS → ❌ PROHIBIDO, cambiar a `const`/`let`
- [ ] Buscar `console.log` → ❌ PROHIBIDO, cambiar a `Logger.log()`
- [ ] Buscar `#XXXXXX` en CSS → ¿Está en variables? Si no, ❌ ERROR
- [ ] Buscar `onclick=` o `style=` en HTML → ❌ PROHIBIDO
- [ ] Verificar imports ES6 → ¿Todos los módulos importados?

#### 3.2 Verificación contra ARCHITECTURE.md

**Secciones a revisar** (según tipo de cambio):

| Cambio | Secciones ARCHITECTURE.md |
|--------|---------------------------|
| CSS | 2.2, 3.2.1-3.2.5 |
| JavaScript | 2.2, 3.3.1-3.3.9 |
| HTML | 3.1.1 |
| Estructura archivos | 2.1, 2.3 |

**Proceso**:
1. Abrir ARCHITECTURE.md
2. Leer sección aplicable
3. Comparar código escrito con reglas
4. **Si hay discrepancia** → Ir a Fase 3.3

#### 3.3 Corrección y Re-verificación (Loop)

```
MIENTRAS existan errores:
    1. Identificar error específico
    2. Corregir código
    3. Volver a Fase 3.1 (verificar todo de nuevo)
FIN MIENTRAS
```

**Criterio de salida**: ✅ CERO errores encontrados

#### 3.4 Verificación contra SEO_Estado_Actual.md

**Solo si el cambio afecta**:
- [ ] Performance (imágenes, JS, cache)
- [ ] Meta tags (HTML head)
- [ ] Datos estructurados (JSON-LD)
- [ ] Core Web Vitals (LCP, CLS, INP)

**Targets a verificar**:
- LCP ≤ 2.5s
- CLS ≤ 0.1
- INP ≤ 200ms
- Lighthouse Performance ≥ 90

---

## 🚨 Ejemplos de Aplicación

### **Ejemplo 1: Agregar Nuevo Botón**

#### FASE 1 (Pre-code):
```
✅ Revisar ARCHITECTURE.md sección 3.2
✅ Ver que existe .btn-primary-desktop en _components-desktop.css
✅ Verificar variables: --color-primary, --space-md, --radius-md
✅ Confirmar naming: .btn-[tipo]-[plataforma]
```

#### FASE 2 (Code):
```html
<!-- ✅ Reutiliza clase existente -->
<button class="btn-primary-desktop">
    Nuevo Botón
</button>
```

#### FASE 3 (Post-code):
```
✅ Buscar hardcoded colors → 0 encontrados
✅ Buscar inline styles → 0 encontrados
✅ Verificar clase existe en _components-desktop.css → SÍ
✅ APROBADO
```

---

### **Ejemplo 2: Agregar Logging en JS**

#### FASE 1 (Pre-code):
```
✅ Revisar ARCHITECTURE.md sección 3.3.4
✅ Ver que console.log está PROHIBIDO
✅ Verificar que Logger está en utils/logger.js
✅ Confirmar import: import { Logger } from '../../utils/logger.js'
```

#### FASE 2 (Code):
```javascript
import { Logger } from '../../utils/logger.js';

function myFunction() {
    Logger.log('[MODULE] Starting process...');
}
```

#### FASE 3 (Post-code):
```
✅ Buscar "console.log" → 0 encontrados
✅ Buscar "Logger" import → 1 encontrado ✅
✅ Verificar uso correcto Logger.log() → SÍ
✅ APROBADO
```

---

## 🔧 Herramientas de Verificación

### **Comandos de Búsqueda (Git Bash / PowerShell)**

```bash
# Buscar !important ilegal
grep -rn "!important" css/ --include="*.css" | grep -v "prefers-reduced-motion"

# Buscar var en JS
grep -rn "var " js/ --include="*.js"

# Buscar console.log directo
grep -rn "console.log" js/ --include="*.js" | grep -v "Logger"

# Buscar colores hardcodeados (hex)
grep -rn "#[0-9a-fA-F]\{6\}" css/ --include="*.css" | grep -v "_variables.css"

# Buscar inline styles/scripts
grep -rn "style=" partials/ --include="*.html"
grep -rn "onclick=" partials/ --include="*.html"
```

### **VS Code Extensions Recomendadas**

- **stylelint** - Valida CSS
- **ESLint** - Valida JavaScript
- **HTMLHint** - Valida HTML

---

## 📊 Métricas de Cumplimiento

### **Objetivo**: 100% compliance en TODAS las ediciones

**Indicadores**:
- ✅ 0 `!important` fuera de `prefers-reduced-motion`
- ✅ 0 `var` en JavaScript
- ✅ 0 `console.log` directo
- ✅ 0 colores hardcodeados fuera de `_variables.css`
- ✅ 0 inline `style=` o `onclick=`

---

## 🚫 Violaciones y Consecuencias

### **Violación de Workflow**

Si se encuentra código que **NO** pasó por este proceso:

1. ⚠️ **Identificar** qué fase falló
2. 🔄 **Revertir** cambio si es bloqueante
3. ✅ **Aplicar** Fase 1-3 correctamente
4. 📝 **Documentar** lección aprendida

### **Reglas No Negociables**

Estas reglas **NUNCA** pueden omitirse:
- ❌ NO hardcoded colors (excepto variables)
- ❌ NO `!important` (excepto `prefers-reduced-motion`)
- ❌ NO `var` en JavaScript
- ❌ NO `console.log` directo
- ❌ NO inline `style=` o `onclick=`

---

## 📚 Referencias Rápidas

**Documentos clave**:
1. `ARCHITECTURE.md` - Fuente de verdad para código
2. `SEO_Estado_Actual.md` - Targets de performance
3. `PRE_DEPLOY_CHECKLIST.md` - Verificación antes de deploy
4. Este documento - Workflow obligatorio

**Ubicaciones**:
- ARCHITECTURE.md: `planespro_final/ARCHITECTURE.md`
- SEO: `planespro_final/docs/SEO_Estado_Actual.md`
- Checklist: `planespro_final/docs/PRE_DEPLOY_CHECKLIST.md`

---

## ✅ Confirmación de Cumplimiento

Antes de considerar un cambio "completo", confirmar:

- [ ] ✅ FASE 1 completada (revisé ARCHITECTURE.md antes)
- [ ] ✅ FASE 2 completada (escribí código siguiendo reglas)
- [ ] ✅ FASE 3.1 completada (checklist post-code)
- [ ] ✅ FASE 3.2 completada (verificación contra ARCHITECTURE.md)
- [ ] ✅ FASE 3.3 completada (loop de corrección hasta 0 errores)
- [ ] ✅ FASE 3.4 completada (verificación SEO si aplica)

**Solo cuando TODAS las fases están ✅ → Cambio APROBADO**

---

**Establecido**: 2026-01-12  
**Vigencia**: PERMANENTE  
**Actualización**: Cada vez que se actualice ARCHITECTURE.md o SEO_Estado_Actual.md
