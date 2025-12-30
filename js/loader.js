/* ===================================
   LOADER - HTML Components System
   Loads HTML partials asynchronously
   =================================== */

/**
 * Load an HTML component from partials directory
 * @param {string} placeholderId - ID of the placeholder element
 * @param {string} componentPath - Path to the HTML file (relative to project root)
 */
async function loadComponent(placeholderId, componentPath) {
    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }

        const html = await response.text();
        const placeholder = document.getElementById(placeholderId);

        if (!placeholder) {
            console.error(`Placeholder element #${placeholderId} not found`);
            return;
        }

        placeholder.innerHTML = html;
        console.log(`[LOADER] Loaded: ${componentPath}`);

    } catch (error) {
        console.error(`[LOADER] Error loading component:`, error);
    }
}

/**
 * Load all page components in sequence
 */
async function loadAllComponents() {
    console.log('[LOADER] Loading HTML components...');

    // Load header (desktop + mobile)
    await loadComponent('header-placeholder', 'partials/header.html');

    // Load sections
    await loadComponent('hero-placeholder', 'partials/sections/hero.html');
    await loadComponent('proceso-placeholder', 'partials/sections/proceso.html');

    // Add more sections as they are created:
    // await loadComponent('planes-placeholder', 'partials/sections/planes.html');
    // await loadComponent('casos-placeholder', 'partials/sections/casos.html');
    // await loadComponent('testimonios-placeholder', 'partials/sections/testimonios.html');

    // Load footer
    // await loadComponent('footer-placeholder', 'partials/footer.html');

    console.log('[LOADER] All components loaded');
}

/**
 * Initialize JavaScript modules after HTML is loaded
 */
async function initializeModules() {
    console.log('[LOADER] Initializing JavaScript modules...');

    // Import and initialize mobile menu
    const { initMobileMenu } = await import('./modules/header/mobile_menu.js');
    initMobileMenu();

    console.log('[LOADER] JavaScript modules initialized');
}

/**
 * Main initialization
 */
async function init() {
    try {
        // First load all HTML components
        await loadAllComponents();

        // Then initialize JavaScript modules
        await initializeModules();

        // Finally, render content from data files
        const { renderAll } = await import('./core/renderer.js');
        await renderAll();

        console.log('[LOADER] Application ready');

    } catch (error) {
        console.error('[LOADER] Initialization error:', error);
    }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
