import { perfilesData } from '../../data/perfiles_data.js';
import { Logger } from '../../utils/logger.js';

/**
 * Initialize Perfiles Dashboard Interaction
 * Manages transition from grid to dashboard and tab navigation
 */
export function initPerfilesInteraction() {
    const gridContainer = document.getElementById('perfilesGridContainer');
    const dashboard = document.getElementById('perfilesDashboard');

    if (!gridContainer || !dashboard) {
        Logger.warn('Perfiles containers not found');
        return;
    }

    // Wait for cards to be rendered
    setTimeout(() => {
        attachCardClickHandlers(gridContainer, dashboard);
    }, 100);
}

/**
 * Attach click handlers to profile cards
 */
function attachCardClickHandlers(gridContainer, dashboard) {
    const cards = document.querySelectorAll('.perfiles-card');

    if (cards.length === 0) {
        Logger.warn('No profile cards found');
        return;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const profileId = card.dataset.profile;
            transitionToDashboard(profileId, gridContainer, dashboard);
        });
    });
}

/**
 * Transition from grid view to dashboard view
 */
function transitionToDashboard(profileId, gridContainer, dashboard) {
    // 1. Fade out grid
    gridContainer.classList.add('fade-out');

    // 2. After animation, hide grid and show dashboard
    setTimeout(() => {
        gridContainer.style.display = 'none';
        dashboard.classList.add('active');

        // 3. Render dashboard content
        renderDashboard(profileId);
    }, 300);
}

/**
 * Render complete dashboard (tabs + card + validation)
 */
function renderDashboard(profileId) {
    const profile = perfilesData.find(p => p.id === profileId);

    if (!profile) {
        Logger.error(`Profile ${profileId} not found`);
        return;
    }

    // Render all dashboard components
    renderTabs(profileId);
    renderPlanCard(profile.recommendedPlan, profile.label);
    renderValidationPanel(profile.validation);
}

/**
 * Render tabs navigation
 */
function renderTabs(activeId) {
    const tabsContainer = document.getElementById('perfilesTabs');

    if (!tabsContainer) return;

    // Find active profile for name display
    const activeProfile = perfilesData.find(p => p.id === activeId);

    const tabsHTML = `
        <button class="back-to-grid-btn" id="backToGrid" title="Volver al inicio">
            <i class="fas fa-arrow-left"></i>
        </button>
        ${perfilesData.map(profile => {
        const isActive = profile.id === activeId ? 'active' : '';
        return `
                <button class="profile-tab ${isActive}" data-profile="${profile.id}">
                    <i class="fas ${profile.icon}"></i>
                    <span>${profile.label}</span>
                </button>
            `;
    }).join('')}
    `;

    tabsContainer.innerHTML = tabsHTML;

    // Attach back button handler
    const backBtn = document.getElementById('backToGrid');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            returnToGrid();
        });
    }

    // Attach tab click handlers
    tabsContainer.querySelectorAll('.profile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const newProfileId = tab.dataset.profile;
            switchProfile(newProfileId);
        });
    });
}

/**
 * Return to grid view
 */
function returnToGrid() {
    const gridContainer = document.getElementById('perfilesGridContainer');
    const dashboard = document.getElementById('perfilesDashboard');

    // Hide dashboard
    dashboard.classList.remove('active');

    // Show grid after animation
    setTimeout(() => {
        gridContainer.style.display = 'flex';
        gridContainer.classList.remove('fade-out');
    }, 200);
}

/**
 * Switch to different profile (update active tab and content)
 */
function switchProfile(profileId) {
    // Update active tab
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.profile === profileId);
    });

    // Re-render content
    const profile = perfilesData.find(p => p.id === profileId);
    if (profile) {
        renderPlanCard(profile.recommendedPlan, profile.label);
        renderValidationPanel(profile.validation);
    }
}

/**
 * Render plan card (left column)
 */
function renderPlanCard(plan, profileLabel) {
    const cardContainer = document.getElementById('dashboardCard');

    if (!cardContainer) return;

    // Use denseMetrics if available, otherwise benefits
    let bodyContent = '';

    if (plan.denseMetrics) {
        bodyContent = `
            <div class="card-dense-grid">
                ${plan.denseMetrics.map(m => `
                    <div class="dense-metric-item">
                        <i class="fas ${m.icon} metric-icon"></i>
                        <div class="metric-info">
                            <span class="metric-label">${m.label}</span>
                            <span class="metric-value">${m.value}</span>
                            <span class="metric-sub">${m.sub}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (plan.benefits) {
        bodyContent = `
            <ul class="card-benefits-list">
                ${plan.benefits.map(b => `
                    <li><i class="fas fa-check"></i> ${b}</li>
                `).join('')}
            </ul>
        `;
    }

    cardContainer.innerHTML = `
        <div class="plan-card-premium">
            <!-- Header azul -->
            <div class="card-header-premium">
                <img src="${plan.isapreLogo}" alt="${plan.name}" class="logo-premium" onerror="this.style.display='none'">
                <div class="tag-premium ${plan.tagClass}">${plan.tag}</div>
            </div>

            <!-- Body -->
            <div class="card-body-premium">
                <!-- Profile Badge -->
                <div class="profile-badge">
                    <i class="fas fa-user"></i> Perfil: <strong>${profileLabel}</strong>
                </div>

                <!-- Precio -->
                <div class="price-premium">
                    <span class="price-val">${plan.price}</span>
                    <span class="price-sub">${plan.priceCLP}</span>
                </div>

                <!-- Plan name -->
                <h4 class="plan-name">${plan.name}</h4>
                <p class="plan-coverage">${plan.keyCoverage}</p>

                <!-- Métricas o beneficios -->
                ${bodyContent}

                <!-- CTA -->
                <a href="#contacto" class="btn-select-plan">
                    ${plan.ctaText || 'Solicitar Plan'}
                </a>
            </div>
        </div>
    `;
}

/**
 * Render validation panel (right column)
 */
function renderValidationPanel(validation) {
    const panelContainer = document.getElementById('dashboardValidation');

    if (!panelContainer) return;

    const bulletsHTML = validation.bullets.map(b => `<li>${b}</li>`).join('');

    panelContainer.innerHTML = `
        <div class="validation-content">
            <h3 class="validation-title">${validation.title}</h3>
            <p class="validation-description">${validation.description}</p>
            
            <h4 class="validation-subtitle">Este perfil es para ti si:</h4>
            <ul class="validation-bullets">
                ${bulletsHTML}
            </ul>
        </div>
    `;
}
