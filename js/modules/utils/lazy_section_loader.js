/**
 * Lazy Section Loader
 * Uses Intersection Observer to lazy load sections when they're about to enter viewport
 */

import { Logger } from '../../utils/logger.js';

export function initLazySectionLoader() {
    // Only lazy load below-the-fold sections
    const lazySections = [
        { id: 'perfiles-placeholder', partial: 'partials/sections/perfiles-desktop.html' },
        // Add more sections here as needed
    ];

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        Logger.warn('Intersection Observer not supported, loading all sections immediately');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const sectionData = lazySections.find(s => s.id === target.id);

                if (sectionData) {
                    Logger.log(`Lazy loading section: ${sectionData.id}`);
                    loadSection(target, sectionData.partial);
                    observer.unobserve(target); // Stop observing once loaded
                }
            }
        });
    }, {
        rootMargin: '200px' // Start loading 200px before entering viewport
    });

    // Observe each lazy section
    lazySections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
            observer.observe(element);
        }
    });
}

async function loadSection(container, partialPath) {
    try {
        const response = await fetch(partialPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        container.innerHTML = html;

        // Dispatch custom event for when section is loaded
        container.dispatchEvent(new CustomEvent('sectionLoaded', {
            detail: { path: partialPath }
        }));

        Logger.log(`Section loaded successfully: ${partialPath}`);
    } catch (error) {
        Logger.error(`Failed to load section ${partialPath}:`, error);
    }
}
