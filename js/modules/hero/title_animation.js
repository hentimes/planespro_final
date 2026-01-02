
/**
 * Hero Title Animation - Final Stable Version
 * Logic: Simple appending + Opacity toggle for layout stability
 */
export function initHeroTitleAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;

    // 1. CLEAR & PREPARE DOM
    titleElement.innerHTML = '';

    // PREPARE SEQUENCE CONTAINER
    // We add 'anim-ready' class to HIDE elements initially.
    // If this script fails, class is never added -> elements stay visible.
    const heroSection = document.querySelector('.hero-section-desktop') || document.getElementById('inicio');
    if (heroSection) {
        heroSection.classList.add('anim-ready');
        // console.log('[ANIMATION] ...');'[ANIMATION] progressive enhancement active: elements hidden');
    }

    const part1 = document.createElement('span');
    part1.className = 'type-text'; // The typing part

    // The cursor is an independent sibling.
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';

    const part2 = document.createElement('span');
    part2.className = 'second-line'; // The gradient part
    part2.textContent = 'Optimiza tu 7%';

    titleElement.appendChild(part1);
    titleElement.appendChild(cursor);
    titleElement.appendChild(part2);

    // 2. TYPING LOGIC
    const textToType = "Deja de perder dinero en tu Isapre.";
    let charIndex = 0;

    // Start delay
    setTimeout(() => {

        function typeStep() {
            if (charIndex < textToType.length) {
                part1.textContent += textToType.charAt(charIndex);
                charIndex++;

                // Random natural speed (30ms - 70ms)
                setTimeout(typeStep, 30 + Math.random() * 40);
            } else {
                // Typing Done. Start "Blink & Reveal" sequence.
                onTypingComplete();
            }
        }

        typeStep();

    }, 500);

    function onTypingComplete() {
        // Wait 2 seconds with cursor blinking
        setTimeout(() => {

            // A. Make cursor invisible
            cursor.classList.add('invisible');

            // B. Fade in second line
            part2.classList.add('visible');

            /* 
             * TRIGGER SEQUENCE (Waterfall Effect)
             * Timeline starts from here (Line 2 appear)
             */
            const heroSection = document.querySelector('.hero-section-desktop') || document.getElementById('inicio');

            if (heroSection) {
                // console.log('[ANIMATION] ...');'[ANIMATION] Sequence triggered on:', heroSection);

                // Step 2: Paragraph ( +500ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-2');
                    // console.log('[ANIMATION] ...');'[ANIMATION] Step 2: Paragraph');
                }, 500);

                // Step 3: Action Block (Avatars, Img, CTA) ( +800ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-3');
                    // console.log('[ANIMATION] ...');'[ANIMATION] Step 3: Action -> Dispatching social proof start V2');
                    document.dispatchEvent(new CustomEvent('hero-start-social-proof-v2'));
                }, 800);

                // Step 4: Pills ( +1100ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-4');
                    // console.log('[ANIMATION] ...');'[ANIMATION] Step 4: Pills');
                }, 1100);

                // Step 5: Footer ( +1400ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-5');
                    // console.log('[ANIMATION] ...');'[ANIMATION] Step 5: Footer');
                }, 1400);

                // FAILSAFE: Force visibility if CSS fails ( +2500ms )
                setTimeout(() => {
                    const hiddenElements = document.querySelectorAll('.hero-description, .hero-cta-group, .hero-image-area, .hero-benefits-row, .hero-footer');
                    hiddenElements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        if (style.opacity === '0') {
                            console.warn('[ANIMATION] Failsafe triggered for:', el);
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }
                    });
                }, 2500);

            } else {
                console.error('[ANIMATION] Hero section container not found!');
            }

        }, 2000);
    }
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initHeroTitleAnimation();
    });
} else {
    // If already loaded
    initHeroTitleAnimation();
}
