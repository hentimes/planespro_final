
/**
 * Hero Title Animation - Final Stable Version
 * Logic: Simple appending + Opacity toggle for layout stability
 */
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
    const heroSection = document.querySelector('.hero-section-desktop') || document.getElementById('inicio');
    if (heroSection) {
        heroSection.classList.add('anim-ready');
    }

    // Line 1 Container
    const line1 = document.createElement('span');
    line1.className = 'type-text'; // Typing part 1

    // Line Break (Initially hidden/not active until needed, checking flow)
    // Actually simplicity: We can just append a BR when time comes.

    // Line 2 Container
    const line2 = document.createElement('span');
    line2.className = 'type-text'; // Typing part 2

    // The cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor-blink';

    // Line 3 (Static Gradient)
    const line3 = document.createElement('span');
    line3.className = 'second-line'; // The gradient part
    line3.textContent = 'Optimiza tu 7%';

    // Structure: [Line1] [Cursor] ... then BR ... [Line2] ... then [Line3]
    // To make this smooth, we start with just Line1 and Cursor.
    titleElement.appendChild(line1);
    titleElement.appendChild(cursor);
    titleElement.appendChild(line3);

    // 2. TYPING LOGIC
    const textLine1 = "Deja de perder dinero";
    const textLine2 = "en tu Isapre.";

    let charIndex1 = 0;
    let charIndex2 = 0;

    // Start delay
    setTimeout(() => {

        function typeLine1() {
            if (charIndex1 < textLine1.length) {
                line1.textContent += textLine1.charAt(charIndex1);
                charIndex1++;
                setTimeout(typeLine1, 30 + Math.random() * 40);
            } else {
                // Line 1 Done. 
                // Move Cursor to new line? 
                // Strategy: Insert BR. Move Cursor after BR.
                const br = document.createElement('br');
                titleElement.insertBefore(br, cursor);
                titleElement.insertBefore(line2, cursor);

                // Small pause before Line 2
                setTimeout(typeLine2, 300);
            }
        }

        function typeLine2() {
            if (charIndex2 < textLine2.length) {
                line2.textContent += textLine2.charAt(charIndex2);
                charIndex2++;
                setTimeout(typeLine2, 30 + Math.random() * 40);
            } else {
                // All Typing Done.
                onTypingComplete();
            }
        }

        typeLine1();

    }, 500);

    function onTypingComplete() {
        // Wait 1 second (reduced from 2) with cursor blinking at end
        setTimeout(() => {

            // A. Make cursor invisible
            cursor.classList.add('invisible');

            // B. Fade in third line (Optimiza tu 7%)
            line3.classList.add('visible');

            /* 
             * TRIGGER SEQUENCE (Waterfall Effect)
             */
            const heroSection = document.querySelector('.hero-section-desktop') || document.getElementById('inicio');

            if (heroSection) {
                // Step 2: Paragraph ( +500ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-2');
                }, 500);

                // Step 3: Action Block ( +800ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-3');
                    document.dispatchEvent(new CustomEvent('hero-start-social-proof-v2'));
                }, 800);

                // Step 4: Pills ( +1100ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-4');
                }, 1100);

                // Step 5: Footer ( +1400ms )
                setTimeout(() => {
                    heroSection.classList.add('seq-step-5');
                }, 1400);

                // FAILSAFE ( +2500ms )
                setTimeout(() => {
                    const hiddenElements = document.querySelectorAll('.hero-description, .hero-cta-group, .hero-image-area, .hero-benefits-row, .hero-footer');
                    hiddenElements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        if (style.opacity === '0') {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }
                    });
                }, 2500);

            }

        }, 1000);
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
