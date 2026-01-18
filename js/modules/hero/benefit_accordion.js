// ===================================
// BENEFIT PILLS ACCORDION MODULE
// Logic: 
// 1. First active on load/reset.
// 2. Click outside or toggle closes pill.
// 3. If NO pills active -> First one pulses.
// 4. If ANY pill active -> No pulse.
// ===================================

import { Logger } from '../../utils/logger.js';

export function initBenefitAccordion() {
    Logger.log('[ACCORDION] Initializing module...');

    function togglePulse(forceOff = false) {
        const pills = document.querySelectorAll('.benefit-accordion');
        const anyActive = document.querySelector('.benefit-accordion.active');
        const firstPill = pills[0];

        if (!firstPill) return;

        if (forceOff || anyActive) {
            firstPill.classList.remove('pulse-hint');
        } else {
            // No active pills -> Start pulsing first one
            firstPill.classList.add('pulse-hint');
        }
    }

    // --- CLICK HANDLING ---
    function handlePillClick(e) {
        const clickedPill = e.target.closest('.benefit-accordion');

        // 1. Clicked ON a pill
        if (clickedPill) {
            const wasActive = clickedPill.classList.contains('active');

            // Close all first
            document.querySelectorAll('.benefit-accordion').forEach(p => p.classList.remove('active'));

            // Toggle
            if (!wasActive) {
                clickedPill.classList.add('active');
            }
        }
        // 2. Clicked OUTSIDE (and not on a pill)
        else {
            // Close all
            document.querySelectorAll('.benefit-accordion').forEach(p => p.classList.remove('active'));
        }

        // Check if we need to pulse
        togglePulse();
    }

    // Attach to document to handle "click outside" seamlessly
    document.addEventListener('click', handlePillClick);


    // --- RESET ON SECTION RE-ENTRY ---
    function resetAccordion() {
        const pills = document.querySelectorAll('.benefit-accordion');
        if (pills.length === 0) return;

        // Open first one
        pills.forEach((p, index) => {
            if (index === 0) p.classList.add('active');
            else p.classList.remove('active');
        });

        // Update pulse state (should be OFF since one is active)
        togglePulse();
    }

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetAccordion();
            }
        });
    }, observerOptions);

    // Init Observer
    const interval = setInterval(() => {
        const heroSection = document.querySelector('.hero-section-desktop');
        if (heroSection) {
            heroObserver.observe(heroSection);
            clearInterval(interval);
        }
    }, 500);

}
