/* ===================================
   DOM Helpers - Utility Functions
   Small helper functions for DOM manipulation
   =================================== */

/**
 * Select a single element
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null}
 */
export function select(selector) {
    return document.querySelector(selector);
}

/**
 * Select multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export function selectAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add class to element
 * @param {HTMLElement} element
 * @param {string} className
 */
export function addClass(element, className) {
    if (!element) return;
    element.classList.add(className);
}

/**
 * Remove class from element
 * @param {HTMLElement} element
 * @param {string} className
 */
export function removeClass(element, className) {
    if (!element) return;
    element.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
    if (!element) return;
    element.classList.toggle(className);
}

/**
 * Show element
 * @param {HTMLElement} element
 */
export function show(element) {
    if (!element) return;
    element.style.display = 'block';
}

/**
 * Hide element
 * @param {HTMLElement} element
 */
export function hide(element) {
    if (!element) return;
    element.style.display = 'none';
}

/**
 * Set text content
 * @param {HTMLElement} element
 * @param {string} text
 */
export function setText(element, text) {
    if (!element) return;
    element.textContent = text;
}

/**
 * Set HTML content
 * @param {HTMLElement} element
 * @param {string} html
 */
export function setHTML(element, html) {
    if (!element) return;
    element.innerHTML = html;
}

/**
 * Create element with optional classes and text
 * @param {string} tag - HTML tag name
 * @param {string} className - Optional class name
 * @param {string} text - Optional text content
 * @returns {HTMLElement}
 */
export function createElement(tag, className = '', text = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
}
