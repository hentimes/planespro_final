/**
 * PlanesPro Final - Main JavaScript
 * Central Orchestrator
 * ARCH: Single Responsibility - Application Entry Point
 */

import { loadAllComponents } from './loader.js';

/**
 * Initialize JavaScript modules based on platform
 */
async function initModules() {
    // console.log('[MAIN] ...');'[MAIN] Initializing JavaScript modules...');
    const isMobile = window.innerWidth <= 768;

    // 1. Mobile Menu (Always loaded for resize handling)
    const { initMobileMenu } = await import('./modules/header/mobile_menu.js');
    initMobileMenu();

    // 2. Planes Data Rendering (Always loaded)
    const { renderPlanes } = await import('./modules/planes/planes_ui.js');
    renderPlanes();

    // 3. Desktop-specific modules
    if (!isMobile) {
        // Benefit Accordion
        try {
            const { initBenefitAccordion } = await import('./modules/hero/benefit_accordion.js');
            initBenefitAccordion();
        } catch (e) { console.error('❌ [MAIN] Accordion load failed', e); }

        // Hero Title Animation
        try {
            const { initHeroTitleAnimation } = await import('./modules/hero/title_animation.js');
            initHeroTitleAnimation();
        } catch (e) { console.error('❌ [MAIN] Title Animation load failed', e); }

        // Social Proof (Avatars)
        try {
            // Cache bust to ensure latest logic loaded
            const { initSocialProof } = await import(`./modules/hero/social_proof.js?v=${Date.now()}`);
            initSocialProof();
        } catch (e) { console.error('❌ [MAIN] Social Proof load failed', e); }
    }

    // 4. Logo Fader (Always loaded)
    const { initLogoFader } = await import('./modules/ui/logo_fader.js');
    initLogoFader();

    // console.log('[MAIN] ...');'[MAIN] Modules initialized');
}

/**
 * Main Initialization Sequence
 */
async function init() {
    try {
        // console.log('[MAIN] ...');'[MAIN] Starting application...');

        // 1. Load HTML Structure
        await loadAllComponents();

        // 2. Initialize Interactive Modules
        await initModules();

        // 3. Render Dynamic Content (Data Layer)
        const { renderAll } = await import('./core/renderer.js');
        await renderAll();

        // console.log('[MAIN] ...');'✅ [MAIN] Application Ready');

    } catch (error) {
        console.error('❌ [MAIN] Critical Initialization Error:', error);
    }
}

// Start execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
