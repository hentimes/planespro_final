/**
 * PlanesPro Final - Main JavaScript
 * Central Orchestrator
 * ARCH: Single Responsibility - Application Entry Point
 */

import { loadAllComponents } from './loader.js';
import { Logger } from './utils/logger.js';

/**
 * Initialize JavaScript modules based on platform
 */
async function initModules() {
    // 1. Mobile Menu (Always loaded for resize handling)
    const { initMobileMenu } = await import('./modules/header/mobile_menu.js');
    initMobileMenu();

    // 2. Planes Data Rendering (Always loaded)
    try {
        const { renderPlanes } = await import('./modules/planes/planes_ui.js');
        renderPlanes();
    } catch (e) { Logger.error('Planes UI load failed', e); }

    // 3. Desktop-specific modules (Loaded unconditionally for responsive resize)
    // Benefit Accordion
    try {
        const { initBenefitAccordion } = await import('./modules/hero/benefit_accordion.js');
        initBenefitAccordion();
    } catch (e) { Logger.error('Accordion load failed', e); }

    // Hero Title Animation
    try {
        const { initHeroTitleAnimation } = await import('./modules/hero/title_animation.js?v=2.9');
        initHeroTitleAnimation();
    } catch (e) {
        Logger.error('Title Animation load failed', e);
        // Fallback: Show title without animation
        const title = document.querySelector('.hero-title');
        if (title) {
            title.innerHTML = 'Deja de perder dinero <br> en tu Isapre.';
            title.classList.add('js-ready');
        }
    }

    // Social Proof (Avatars)
    try {
        // Cache bust to ensure latest logic loaded
        const { initSocialProof } = await import(`./modules/hero/social_proof.js?v=${Date.now()}`);
        initSocialProof();
    } catch (e) { Logger.error('Social Proof load failed', e); }

    // 4. Logo Fader (Always loaded)
    const { initLogoFader } = await import('./modules/hero/logo_fader.js');
    initLogoFader();

    // 5. Sidebar Logic (Global event delegation)
    // Replaces inline onclick="toggleSidebar()"
    document.addEventListener('click', (e) => {
        // Check for specific ID or data-action
        if (e.target.matches('#hero-main-cta') || e.target.closest('#hero-main-cta') || e.target.matches('[data-action="open-sidebar"]')) {
            // Logic to open sidebar
            const sidebar = document.getElementById('sidebar-form');
            if (sidebar) sidebar.classList.add('active');
        }
    });

}

/**
 * Main Initialization Sequence
 */
async function init() {
    try {
        // 1. Load HTML Structure
        await loadAllComponents();

        // 2. Render Dynamic Content (Data Layer)
        // Must run BEFORE modules so animations can manipulate the final content
        const { renderAll } = await import('./core/renderer.js');
        await renderAll();

        // 3. Initialize Interactive Modules
        // Now safe to run: animation scripts will find populated elements (or wipe them if needed)
        await initModules();

    } catch (error) {
        Logger.error('Critical Initialization Error:', error);
    }
}

// Start execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
