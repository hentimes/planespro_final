import { perfilesData } from '../../data/perfiles_data.js?v=7.0';
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

    // Attach handlers using delegation
    Logger.log('[PERFILES Interaction] Attaching delegated handlers...');
    attachCardClickHandlers(gridContainer, dashboard);
}

/**
 * Attach click handlers to profile cards using Event Delegation
 */
function attachCardClickHandlers(gridContainer, dashboard) {
    // Simple delegation - attach once to the container
    gridContainer.addEventListener('click', (e) => {
        // Find closest card ancestor
        const card = e.target.closest('.perfiles-card');

        if (card) {
            const profileId = card.dataset.profileId;
            Logger.log(`[PERFILES] Card clicked: ${profileId}`);

            if (profileId) {
                transitionToDashboard(profileId, gridContainer, dashboard);
            }
        }
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
    renderPlanCard(profile);
    renderValidationPanel(profile.validation);
}

/**
 * Render tabs navigation
 */
function renderTabs(activeId) {
    const tabsContainer = document.getElementById('perfilesTabs');

    if (!tabsContainer) return;

    const tabsHTML = `
        <button class="back-to-grid-btn" id="backToGrid" data-tooltip="Volver a vista general" title="Volver a vista general">
            <i class="fas fa-arrow-left"></i>
        </button>
        ${perfilesData.map(profile => {
        const isActive = profile.id === activeId ? 'active' : '';
        return `
                <button class="profile-tab ${isActive}" data-profile="${profile.id}">
                    <i class="fas ${profile.icon}"></i>
                    <span>${profile.shortLabel || profile.label}</span>
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
        renderPlanCard(profile);
        renderValidationPanel(profile.validation);
    }
}

/**
 * Render plan card (left column)
 */
function renderPlanCard(profile) {
    const cardContainer = document.getElementById('dashboardCard');

    if (!cardContainer) return;

    const plan = profile.recommendedPlan;

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
            <!-- Header with dynamic theme color -->
            <div class="card-header-premium theme-${profile.theme || 'blue'}">
                <div class="tag-premium ${plan.tagClass}">${plan.tag}</div>
                <div class="header-text-col" style="text-align: right;">
                    <div class="plan-coverage-header">${plan.keyCoverage}</div>
                    ${plan.cardSubtitle ? `<div class="plan-subtitle-header" style="font-size:0.75rem; color:rgba(255,255,255,0.85); margin-top:2px; font-weight:500;">${plan.cardSubtitle}</div>` : ''}
                </div>
            </div>

            <!-- Body -->
            <div class="card-body-premium">
                <!-- Price Section: Clean Unified Layout -->
                <div class="price-section">
                    <div class="price-row-clean">
                        <!-- Left: Identity (Icon + Label) -->
                        <div class="price-left-col">
                            <div class="clean-icon-box">
                                <i class="fas ${profile.icon}"></i>
                            </div>
                            <span class="clean-label">Perfil ${profile.label}</span>
                        </div>

                        <!-- Right: Value (Price + UF) -->
                        <div class="price-right-col">
                            <span class="clean-price-main">${plan.priceCLP}</span>
                            <span class="clean-price-sub">${plan.price} / mes</span>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="price-divider"></div>
                </div>

                <!-- Métricas o beneficios -->
                ${bodyContent}

                <!-- Savings Badge (Premium) -->
                ${plan.savings ? `
                <div class="value-badge" style="margin-top:auto;">
                    <i class="fas fa-coins"></i>
                    <span>${plan.savings}</span>
                </div>` : ''}
            </div>

            <!-- Footer with CTA -->
            <div class="card-footer-premium">
                <a href="#contacto" class="btn-primary-desktop cta-card-full">
                    ${plan.ctaText || 'Cotizar Ahora'}
                </a>
                <p class="cta-micro-copy">${plan.ctaSub || '✓ Respuesta en 2 minutos · 100% online'}</p>
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

    // Trust Badge HTML (Optional)
    const trustBadgeHTML = validation.trustBadge ? `
        <div class="validation-trust-badge">
            <i class="fas fa-shield-check"></i>
            <span>${validation.trustBadge}</span>
        </div>
    ` : '';

    panelContainer.innerHTML = `
        <div class="validation-content">
            <h3 class="validation-title">${validation.title}</h3>
            <p class="validation-description">${validation.description}</p>
            
            <h4 class="validation-subtitle">Este perfil es para ti si:</h4>
            <ul class="validation-bullets">
                ${bulletsHTML}
            </ul>

            ${trustBadgeHTML}
        </div>
    `;
}
