/**
 * Proceso Cards Module
 * Handles animations and interactions for the flip cards in the Proceso section.
 */

export function initProcesoCards() {
    const cards = document.querySelectorAll('.flip-card');

    if (cards.length === 0) return;

    // We only want to animate the FIRST card as a hint
    const firstCard = cards[0];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger CSS animation
                // We target the outer card to apply class, CSS targets inner
                firstCard.classList.add('to-animate');

                // Stop observing after firing once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    observer.observe(firstCard);
}
