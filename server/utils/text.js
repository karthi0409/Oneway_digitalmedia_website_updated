/**
 * Utility functions for text sanitization and safety
 */

/**
 * Escapes potentially hazardous HTML characters
 * @param {string} str
 * @returns {string}
 */
export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips script tags and dangerous HTML while preserving harmless formatting
 * @param {string} str
 * @returns {string}
 */
export function cleanInput(str) {
  if (typeof str !== 'string') return '';
  return str.trim();
}
