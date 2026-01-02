/* ===================================
   LOADER - HTML Components System
   Loads HTML partials asynchronously
   ARCH: Pure Utility - No Business Logic
   =================================== */

/**
 * Load an HTML component from partials directory
 * @param {string} placeholderId - ID of the placeholder element
 * @param {string} componentPath - Path to the HTML file (relative to project root)
 */
export async function loadComponent(placeholderId, componentPath) {
    try {
        const response = await fetch(componentPath);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }

        const html = await response.text();
        const placeholder = document.getElementById(placeholderId);

        if (!placeholder) {
            console.error(`[LOADER] Placeholder element #${placeholderId} not found`);
            return;
        }

        placeholder.innerHTML = html;
        // console.log(`[LOADER] Loaded: ${componentPath}`); // Optional: Uncomment for debug

    } catch (error) {
        console.error(`[LOADER] Error loading component:`, error);
    }
}

/**
 * Load all page components in sequence
 * Logic: Conditionally loads desktop/mobile HTML based on viewport
 */
export async function loadAllComponents() {
    console.log('[LOADER] Loading HTML components...');

    // Platform detection (Strictly for HTML loading structure)
    const isMobile = window.innerWidth <= 768;
    console.log(`[LOADER] Platform detected: ${isMobile ? 'Mobile' : 'Desktop'}`);

    // 1. Header (Shared)
    await loadComponent('header-placeholder', 'partials/header.html');

    // 2. Sections (Platform Specific)
    if (isMobile) {
        await loadComponent('hero-placeholder', 'partials/sections/hero-mobile.html');
        await loadComponent('proceso-placeholder', 'partials/sections/proceso-mobile.html');
        await loadComponent('planes-placeholder', 'partials/sections/planes-mobile.html');
    } else {
        await loadComponent('hero-placeholder', 'partials/sections/hero-desktop.html');
        await loadComponent('proceso-placeholder', 'partials/sections/proceso-desktop.html');
        await loadComponent('planes-placeholder', 'partials/sections/planes-desktop.html');
    }

    // 3. Footer (Currently disabled in index, but logic remains valid)
    // await loadComponent('footer-placeholder', 'partials/footer.html');

    console.log('[LOADER] HTML Structure Ready');
}
