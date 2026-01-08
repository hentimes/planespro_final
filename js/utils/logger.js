/**
 * Centralized Logger Utility
 * Control verbosity with a single flag.
 */

// Toggle this to true for development, false for production
const DEBUG = false;

const PREFIX = '[PlanesPro]';

export const Logger = {
    log: (...args) => {
        if (DEBUG) console.log(PREFIX, ...args);
    },

    info: (...args) => {
        if (DEBUG) console.info(PREFIX, 'ℹ️', ...args);
    },

    warn: (...args) => {
        console.warn(PREFIX, '⚠️', ...args);
    },

    error: (...args) => {
        console.error(PREFIX, '❌', ...args);
    }
};
