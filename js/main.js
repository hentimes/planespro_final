/**
 * PlanesPro Final - Main JavaScript
 * Orchestrates all modules
 */

import { initMobileMenu } from './modules/header/mobile_menu.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile hamburger menu
    initMobileMenu();

    console.log('PlanesPro Final - Loaded');
});
