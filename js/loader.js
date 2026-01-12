/* ===================================
   LOADER - HTML Components System
   Loads HTML partials asynchronously
   ARCH: Pure Utility - No Business Logic
   =================================== */

import { Logger } from './utils/logger.js';

/**
 * Load an HTML component from partials directory
 * @param {string} placeholderId - ID of the placeholder element
 * @param {string} componentPath - Path to the HTML file (relative to project root)
 */
export async function loadComponent(placeholderId, componentPath) {
    try {
        // Cache Busting: Force fresh fetch
        const response = await fetch(`${componentPath}?v=${Date.now()}`);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }

        const html = await response.text();
        const placeholder = document.getElementById(placeholderId);

        if (!placeholder) {
            Logger.error(`Placeholder element #${placeholderId} not found`);
            return;
        }

        placeholder.innerHTML = html;
        Logger.log(`Loaded: ${componentPath}`);

    } catch (error) {
        Logger.error(`Error loading component:`, error);
    }
}

// Helper: Fetch raw HTML string
async function fetchPartial(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) return '';
        return await res.text();
    } catch (e) {
        Logger.error('Fetch error:', e);
        return '';
    }
}

// Helper: Set innerHTML
function setPlaceholder(id, content) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = content;
}

/**
 * Load all page components in sequence
 * Logic: Conditionally loads desktop/mobile HTML based on viewport
 */
export async function loadAllComponents() {
    Logger.log('Loading HTML components...');

    // Platform detection (Strictly for HTML loading structure)
    const isMobile = window.innerWidth <= 860;
    Logger.log(`Platform detected: ${isMobile ? 'Mobile' : 'Desktop'}`);

    // 1. Header (Shared)
    await loadComponent('header-placeholder', 'partials/header.html');

    // 2. Sections (Load BOTH to support resize without reload)
    // We combine mobile + desktop HTML into the placeholder so CSS can toggle them.

    // HERO
    const heroMobile = await fetchPartial('partials/sections/hero-mobile.html');
    const heroDesktop = await fetchPartial('partials/sections/hero-desktop.html');
    setPlaceholder('hero-placeholder', heroMobile + heroDesktop);

    // PROCESO
    const procesoMobile = await fetchPartial('partials/sections/proceso-mobile.html');
    const procesoDesktop = await fetchPartial('partials/sections/proceso-desktop.html');
    setPlaceholder('proceso-placeholder', procesoMobile + procesoDesktop);

    // PERFILES
    const perfilesMobile = await fetchPartial('partials/sections/perfiles-mobile.html');
    const perfilesDesktop = await fetchPartial('partials/sections/perfiles-desktop.html');
    setPlaceholder('perfiles-placeholder', perfilesMobile + perfilesDesktop);

    // 3. Footer (Currently disabled in index, but logic remains valid)
    // await loadComponent('footer-placeholder', 'partials/footer.html');

    Logger.log('HTML Structure Ready');
}
