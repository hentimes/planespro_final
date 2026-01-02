// ===================================
// Logo Fader Module - ES6 Export
// Cinematic 35s cycle with asymmetric fades
// ===================================

const ALL_LOGOS = [
    { src: 'assets/logos_isapre/consalud.png', alt: 'Consalud Logo' },
    { src: 'assets/logos_isapre/nuevamasvida.png', alt: 'Nueva Masvida Logo' },
    { src: 'assets/logos_isapre/cruzblanca.png', alt: 'CruzBlanca Logo' },
    { src: 'assets/logos_isapre/colmena.png', alt: 'Colmena Logo' },
    { src: 'assets/logos_isapre/vidatres.png', alt: 'Vida Tres Logo' },
    { src: 'assets/logos_isapre/banmedica-logo.png', alt: 'Banmédica Logo' },
    { src: 'assets/logos_isapre/esencial.png', alt: 'Esencial Logo' }
];

const CYCLE_INTERVAL = 35000; // 35s
const FADE_OUT_DURATION = 5000; // 5s

/**
 * Initialize logo fader animation
 * @export
 */
export function initLogoFader() {
    const container = document.querySelector('.logo-fader');
    if (!container) return;

    // Clean up previous interval if exists
    if (container.dataset.intervalId) {
        clearInterval(Number(container.dataset.intervalId));
        // console.log('[LogoFader] ...');'[LogoFader] Stopped previous interval:', container.dataset.intervalId);
    }

    // console.log('[LogoFader] ...');'[LogoFader] Initializing (35s cycle)');

    function update() {
        const oldImgs = container.querySelectorAll('.logo-fader__img');

        if (oldImgs.length > 0) {
            // Fade out current logos
            oldImgs.forEach(img => img.classList.remove('is-visible'));
            // Wait for fade-out transition, then swap
            setTimeout(swapLogos, FADE_OUT_DURATION);
        } else {
            // First run - no fade out needed
            swapLogos();
        }

        function swapLogos() {
            container.innerHTML = '';
            const count = window.innerWidth <= 768 ? 3 : 7;
            const shuffled = [...ALL_LOGOS].sort(() => 0.5 - Math.random()).slice(0, count);

            shuffled.forEach(logo => {
                const img = document.createElement('img');
                img.src = logo.src;
                img.alt = logo.alt;
                img.className = 'logo-fader__img';
                container.appendChild(img);

                // Trigger reflow
                void img.offsetWidth;

                // Fade in
                img.classList.add('is-visible');
            });
        }
    }

    // Smart init: if logos already exist, just start timer
    if (container.children.length === 0) {
        update();
    }

    // Start animation cycle
    const intervalId = setInterval(update, CYCLE_INTERVAL);
    container.dataset.intervalId = intervalId;
}
