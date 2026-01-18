# 📋 Contexto Completo y Detallado: Proyecto PlanesPro

**Fecha de Corte:** 2026-01-17
**Estado del Proyecto:** Estable / En Desarrollo Activo (Front-end)
**Última Gran Hito:** Refinamiento visual "pixel-perfect" de Cards y solución de infraestructura de caché local.

---

## 1. 🏗️ Arquitectura y Estándares (CRÍTICO)

Este proyecto sigue normas estrictas documentadas en `docs/CODE_QUALITY_WORKFLOW.md`. **El incumplimiento de estas normas es inaceptable.**

### **Stack Tecnológico**
*   **HTML**: Modularizado mediante inyección por JavaScript (`partials/`).
*   **CSS**: Vanilla CSS con variables globales (`css/_variables.css`).
    *   **Metodología**: BEM-ish.
    *   **Estructura**: Separación estricta Desktop/Mobile (ej: `_perfiles-desktop.css` vs `_perfiles-mobile.css`).
    *   **Prohibiciones**: `!important` (salvo excepciones muy justificadas), selectores por ID para estilos.
*   **JavaScript**: ES6 Modules nativos.
    *   **Manejo**: `js/main.js` orquesta la carga dinámica.
    *   **Logging**: OBLIGATORIO usar `Logger` (módulo `js/utils/logger.js`), prohibido `console.log`.

### **Flujo de Trabajo (Resumen)**
1.  **Code Quality Gate**: Antes de editar, verificar `ARCHITECTURE.md`.
2.  **Modularidad**: No escribir bloques monolíticos. Separar lógica en módulos.
3.  **Variables**: Todo color, espaciado o radio debe usar `var(--variable-name)`.

---

## 2. 📍 Estado Actual de la Infraestructura Local

### **Problema Reciente: Caché Persistente**
Enfrentamos un problema donde el servidor local y el navegador retenían versiones antiguas de CSS agresivamente, impidiendo ver cambios visuales críticos.

**Solución Implementada:**
1.  **Versioning Manual**: `index.html` ahora carga estilos con `?v=4.0`.
2.  **Limpieza Nuclear**: Se creó temporalmente un archivo v2 y luego se consolidó de vuelta al original tras verificar la expiración del caché.
3.  **Estado Actual de Archivos**:
    *   `css/_perfiles-desktop.css`: **ACTIVO y CORRECTO**. (Contiene el layout 50/50).
    *   `css/styles.css`: Importa `_perfiles-desktop.css?v=4.0`.

### **Servidores Locales**
*   🛑 **Puerto 3005**: `http-server` falló/bloqueado. **Evitar usar**.
*   ✅ **Puerto 8080**: `python -m http.server 8080` (Activo y funcionando).
*   **URL de pruebas**: [http://localhost:8080/index.html#contacto](http://localhost:8080/index.html#contacto)

---

## 3. 🎨 Estado Visual: Sección "Perfiles" (Cards)

Se trabajó intensamente en la tarjeta del plan recomendado ("Joven" o similar).

**Especificaciones Logradas (No Tocar):**
*   **Layout**: `flex` con división estricta 50% / 50%.
*   **Icono (Izquierda)**:
    *   Tamaño: `3.5rem`.
    *   Posición: Centrado vertical y horizontalmente en su mitad.
*   **Precios (Derecha)**:
    *   Alineación: `flex-end` (Derecha absoluta).
    *   Precio Principal (CLP): `2rem`, gradiente primario.
    *   Precio Secundario (UF): `0.95rem`, gris.
    *   Orden: CLP arriba (grande), UF abajo (pequeño).

---

## 4. 📝 Tareas Pendientes Inmediatas

1.  **Verificación Mobile**: Los cambios recientes fueron específicos para `_perfiles-desktop.css`. Se debe verificar que no hayan roto la vista móvil en `_perfiles-mobile.css`.
2.  **Dark Mode**: Se detectó un archivo `DARK_MODE_PREPARATION.md` abierto. Es probable que sea el siguiente gran paso.
3.  **Limpieza General**: Asegurar que no queden clases CSS redundantes del refactor anterior.

---

## 5. Instrucciones para el Nuevo Agente

Copia y pega este prompt inicial:

> "Hola, retomo el proyecto PlanesPro. He revisado el archivo `docs/HANDOVER_CONTEXT.md` actualizado al 17 de Enero de 2026.
>
> Estado rápido:
> - Servidor: Localhost:8080.
> - Último logro: Fix visual Cards 50/50 y caché resuelto (CSS v4.0).
> - Estándares: Code Quality Workflow activo y estricto.
>
> Por favor, haz un 'ls' inicial para situarte y espera mi primera instrucción."
