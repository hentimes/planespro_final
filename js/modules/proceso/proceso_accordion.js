/**
 * Proceso Accordion Module
 * Handles the vertical accordion interaction in the "Cómo funciona" section.
 */

export function initProcesoAccordion() {
    const accordionItems = document.querySelectorAll('.proceso-accordion-item');

    if (accordionItems.length === 0) return;

    accordionItems.forEach(item => {
        const header = item.querySelector('.proceso-accordion-header');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // If already active, DO NOTHING (Keep it open)
            if (isActive) return;

            // Otherwise, switch active item
            // 1. Close all others
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const content = otherItem.querySelector('.proceso-accordion-content');
                content.style.maxHeight = null;
            });

            // 2. Open clicked
            item.classList.add('active');
            const content = item.querySelector('.proceso-accordion-content');
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });

    // Auto-Open Logic with IntersectionObserver
    // Triggers the animation when the user sees the section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Open first item if none are active
                if (!document.querySelector('.proceso-accordion-item.active') && accordionItems[0]) {
                    const firstItem = accordionItems[0];
                    firstItem.classList.add('active');
                    const content = firstItem.querySelector('.proceso-accordion-content');
                    // Add small delay for better visual effect
                    setTimeout(() => {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }, 100);
                }
                // Stop observing once triggered
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 }); // Trigger when 30% visible

    const accordionContainer = document.querySelector('.proceso-accordion');
    if (accordionContainer) {
        observer.observe(accordionContainer);
    }
}
