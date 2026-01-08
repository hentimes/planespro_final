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
    }

    // console.log('[LogoFader] Initializing (35s cycle)');

    // State to track current mode
    let wasMobile = window.innerWidth <= 720;

    function update(isResize = false) {
        const oldImgs = container.querySelectorAll('.logo-fader__img');

        // Count logic: 720px breakpoint (Matches CSS)
        const isMobile = window.innerWidth <= 720;
        const count = isMobile ? 3 : 7;

        // Optimization: If resize didn't cross breakpoint, do nothing
        if (isResize && (isMobile === wasMobile)) return;
        wasMobile = isMobile;

        if (oldImgs.length > 0 && !isResize) {
            // Normal Cycle: Fade out then swap
            oldImgs.forEach(img => img.classList.remove('is-visible'));
            setTimeout(() => swapLogos(count), FADE_OUT_DURATION);
        } else {
            // First run OR Resize: Instant swap (no fade wait)
            swapLogos(count);
        }
    }

    function swapLogos(count) {
        container.innerHTML = '';
        // Shuffle and slice
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

    // Smart init: if logos already exist, just start timer
    if (container.children.length === 0) {
        update();
    }

    // Start animation cycle
    let intervalId = setInterval(update, CYCLE_INTERVAL);
    container.dataset.intervalId = intervalId;

    // --- RESIZE HANDLER (Debounced) ---
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Force update on resize
            // We clear interval to reset the 35s timer, so user has time to see change
            clearInterval(Number(container.dataset.intervalId));
            update(true); // isResize = true

            // Restart cycle
            const newInterval = setInterval(update, CYCLE_INTERVAL);
            container.dataset.intervalId = newInterval;
        }, 200); // 200ms debounce
    };

    window.addEventListener('resize', handleResize);
}
