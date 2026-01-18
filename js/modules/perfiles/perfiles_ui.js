import { perfilesData } from '../../data/perfiles_data.js?v=9.2';
import { Logger } from '../../utils/logger.js';

/**
 * Render Perfiles Cards into the Grid Container
 * Supports both Desktop (grid) and Mobile (slider/stack) containers
 */
export function renderPerfiles() {
    Logger.log('[PERFILES Renderer] Starting render...');

    // Desktop Container
    const desktopContainer = document.getElementById('perfiles-grid-desktop');
    if (desktopContainer) {
        desktopContainer.innerHTML = '';
        perfilesData.forEach(profile => {
            desktopContainer.insertAdjacentHTML('beforeend', createDesktopCardHTML(profile));
        });
    }

    // Mobile Container
    const mobileContainer = document.getElementById('perfilesSliderContainer');
    if (mobileContainer) {
        mobileContainer.innerHTML = '';
        perfilesData.forEach(profile => {
            mobileContainer.insertAdjacentHTML('beforeend', createMobileCardHTML(profile));
        });
    }
}

/**
 * Generate HTML for Desktop Grid Card
 */
function createDesktopCardHTML(profile) {
    const { id, label, icon, validation, tagline, theme } = profile;
    const namespace = 'perfiles';

    return `
        <article class="${namespace}-card theme-${theme}" data-profile-id="${id}">
            <!-- Icon + Tagline Row -->
            <div class="${namespace}-card-top-row">
                <div class="${namespace}-card-icon-wrapper">
                    <i class="fas ${icon}"></i>
                </div>
                <span class="${namespace}-card-tagline">${tagline}</span>
            </div>

            <!-- Title -->
            <h3 class="${namespace}-card-title">${label}</h3>

            <!-- Description -->
            <p class="${namespace}-card-desc">
                ${validation.description}
            </p>

            <!-- CTA with dynamic profile name -->
            <div class="${namespace}-card-footer">
                <a href="#contacto" class="${namespace}-card-btn">
                    Ver estrategia ${label.split(' ')[0]}
                </a>
            </div>
        </article>
    `;
}

/**
 * Generate HTML for Mobile Slider Card (Enhanced Layout)
 */
function createMobileCardHTML(profile) {
    const { id, label, icon, recommendedPlan } = profile;
    const p = recommendedPlan; // shortcut

    // Determine features list (handle both simple benefits array and denseMetrics)
    let featuresListHTML = '';

    if (p.benefits && Array.isArray(p.benefits)) {
        featuresListHTML = p.benefits.map(b => `
            <li class="plan-feature-item">
                <i class="fas fa-check-circle"></i> ${b}
            </li>
        `).join('');
    } else if (p.denseMetrics && Array.isArray(p.denseMetrics)) {
        // Fallback for profiles using denseMetrics (like 'joven')
        featuresListHTML = p.denseMetrics.slice(0, 3).map(m => `
            <li class="plan-feature-item">
                <i class="${m.icon}"></i> ${m.label}: ${m.value}
            </li>
        `).join('');
    }

    const featuredClass = id === 'joven' ? 'featured' : '';

    return `
        <article class="plan-card-mobile ${featuredClass}" data-profile="${id}">
            <div class="plan-card-header">
                <div class="plan-icon"><i class="fas ${icon}"></i></div>
                <span class="plan-name">${label}</span>
                <small>${p.name}</small>
            </div>
            
            <div class="plan-price-area">
                <span class="plan-price">${p.price}</span>
                <span class="plan-coverage">${p.keyCoverage}</span>
            </div>

            <ul class="plan-features-list">
                ${featuresListHTML}
            </ul>

            <a href="#contacto" class="plan-cta-mobile">
                ${p.ctaText || 'Cotizar'}
            </a>
        </article>
    `;
}
