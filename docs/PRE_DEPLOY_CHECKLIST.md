# Pre-Deploy Checklist - PlanesPro

**Fecha de creación**: 2026-01-12  
**Propósito**: Lista de verificación obligatoria antes de subir cambios a producción

---

## 🚀 ANTES DE SUBIR A PRODUCCIÓN

### 1. ⚠️ **INCREMENTAR VERSIÓN DE CACHE** (CRÍTICO)

**Archivos a modificar**:
- [ ] `js/loader.js` línea ~17
- [ ] `js/main.js` línea ~17

**Cambio requerido**:
```javascript
// ANTES
const CACHE_VERSION = IS_DEV ? Date.now() : '1.0.0';

// DESPUÉS
const CACHE_VERSION = IS_DEV ? Date.now() : '1.1.0'; // ← Incrementar versión
```

**Regla de incremento**:
- Cambios menores (bugfixes): `1.0.0` → `1.0.1`
- Cambios medios (nueva feature): `1.0.0` → `1.1.0`
- Cambios mayores (refactor): `1.0.0` → `2.0.0`

**¿Por qué?**
Sin este cambio, los usuarios verán la **versión cacheada antigua** y no verán tus cambios.

---

### 2. ✅ **Verificación de Código**

- [ ] No hay `console.log()` directo (solo `Logger`)
- [ ] No hay `!important` en CSS (excepto `prefers-reduced-motion`)
- [ ] Todas las variables usan `const`/`let` (no `var`)
- [ ] No hay variables globales sin módulos ES6

---

### 3. 🎨 **Verificación Visual**

- [ ] Probado en Chrome (desktop)
- [ ] Probado en Firefox (desktop)
- [ ] Probado en Chrome mobile (DevTools)
- [ ] No hay flash de contenido (FOUC)
- [ ] Animaciones funcionan correctamente

---

### 4. 📊 **Performance (Core Web Vitals)**

- [ ] Lighthouse Performance ≥ 90
- [ ] LCP ≤ 2.5s
- [ ] CLS ≤ 0.1
- [ ] Todas las imágenes >100KB están en AVIF/WebP

**Cómo verificar**:
```
1. Abrir Chrome DevTools (F12)
2. Tab "Lighthouse"
3. Modo: Desktop
4. Categorías: Performance
5. "Analyze page load"
```

---

### 5. 🔍 **SEO y Meta Tags**

- [ ] JSON-LD válido: https://validator.schema.org/
- [ ] Open Graph correcto: https://www.opengraph.xyz/
- [ ] Meta description presente y ≤155 caracteres
- [ ] Canonical URL definido

---

### 6. 🤖 **Control de Bots**

- [ ] `robots.txt` presente en raíz
- [ ] Bloquea GPTBot (entrenamiento)
- [ ] Permite OAI-SearchBot (búsqueda)
- [ ] Permite PerplexityBot

---

### 7. 📁 **Archivos a Subir**

**Siempre incluir**:
- [ ] `index.html` (si cambió)
- [ ] `js/loader.js` (con nueva versión)
- [ ] `js/main.js` (con nueva versión)
- [ ] Todos los partials modificados
- [ ] Todos los módulos JS modificados
- [ ] CSS modificado

**NO subir**:
- ❌ `node_modules/` (si existe)
- ❌ `.git/`
- ❌ Archivos de desarrollo local

---

### 8. 🧪 **Verificación Post-Deploy**

Después de subir, verifica en producción:

- [ ] Abrir `https://planespro.cl` en **incógnito**
- [ ] Verificar que animaciones funcionan
- [ ] Verificar que no hay errores en console (F12)
- [ ] Verificar que images cargan (Network tab)
- [ ] Hacer hard refresh (`Ctrl+Shift+R`)
- [ ] Volver a verificar que todo funciona

---

## 🔥 EN CASO DE EMERGENCIA (Rollback)

Si algo sale mal en producción:

1. **Revertir versión de cache**:
   ```javascript
   const CACHE_VERSION = IS_DEV ? Date.now() : '1.0.0'; // ← Versión anterior
   ```

2. **Restaurar archivos anteriores** desde backup

3. **Hard refresh** en navegador de usuarios:
   - Avisar que presionen `Ctrl+Shift+R`

---

## 📝 Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0.0 | 2026-01-12 | Release inicial | - |
| | | | |
| | | | |

**Formato**: Actualizar esta tabla cada deploy con la nueva versión y descripción breve.

---

## ⚡ Quick Reference

**Comando Git para deploy**:
```bash
# 1. Verificar cambios
git status

# 2. Commit
git add .
git commit -m "Deploy v1.1.0: [descripción breve]"

# 3. Push
git push origin main
```

**FTP/SFTP**:
- Subir solo archivos modificados
- Verificar permisos (644 para archivos, 755 para directorios)

---

**Última actualización**: 2026-01-12  
**Próxima revisión**: Cada deploy
