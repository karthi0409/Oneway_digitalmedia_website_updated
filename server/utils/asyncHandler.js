/**
 * Wraps async route handlers to catch errors and pass them to Express error middleware
 * @param {Function} fn
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
