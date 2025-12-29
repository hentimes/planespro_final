/**
 * Mobile Menu Controller
 * ARCH: Single responsibility - Handles hamburger menu toggle
 */

let isMenuOpen = false;

export function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    // Close menu on link click
    const menuLinks = mobileMenu.querySelectorAll('.mobile-menu-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Close on CTA click
    const ctaBtn = mobileMenu.querySelector('.mobile-menu-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    }
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    mobileMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}
