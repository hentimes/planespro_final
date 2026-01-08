/* ===================================
   Renderer - Data-Driven Content System
   Renders content from data files into HTML
   =================================== */

import { select, setText } from '../utils/dom_helpers.js';
import { Logger } from '../utils/logger.js';

/**
 * Render content to elements with data-content attributes
 * @param {Object} data - Data object (nested OK)
 * @param {string} prefix - Optional prefix for nested keys
 */
export function renderContent(data, prefix = '') {
    Object.keys(data).forEach(key => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = data[key];

        // If value is an object, recurse
        if (typeof value === 'object' && !Array.isArray(value)) {
            renderContent(value, fullKey);
            return;
        }

        // Find elements with data-content attribute
        const selector = `[data-content="${fullKey}"]`;
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            if (Array.isArray(value)) {
                // Handle arrays (e.g., list of items)
                element.innerHTML = value.join('<br>');
            } else {
                // Simple text replacement
                element.textContent = value;
            }
        });
    });
}

/**
 * Render a template with data
 * @param {string} template - HTML template string with {{key}} placeholders
 * @param {Object} data - Data object
 * @returns {string} Rendered HTML
 */
export function renderTemplate(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] !== undefined ? data[key] : match;
    });
}

/**
 * Render multiple items using a template
 * @param {string} containerId - ID of container element
 * @param {string} template - HTML template string
 * @param {Array} items - Array of data objects
 */
export function renderList(containerId, template, items) {
    const container = select(`#${containerId}`);
    if (!container) {
        Logger.error(`Container #${containerId} not found`);
        return;
    }

    const html = items.map(item => renderTemplate(template, item)).join('');
    container.innerHTML = html;
}

/**
 * Initialize all rendering
 * Call this after HTML components are loaded
 */
export async function renderAll() {
    try {
        Logger.log('Starting data-driven rendering...');

        // Import data files
        const { heroContent } = await import('../data/hero_content.js');

        // Render hero content
        renderContent(heroContent, 'hero');

        Logger.log('Rendering complete');

    } catch (error) {
        Logger.error('Rendering error:', error);
    }
}
