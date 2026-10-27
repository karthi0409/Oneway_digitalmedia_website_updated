/**
 * API client helper for One Way Digital Media
 */

const API_BASE = '/api';

/**
 * Handles JSON response or throws formatted error
 */
async function handleResponse(res) {
  const contentType = res.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    if (res.status === 429) {
      const err = new Error(
        (data && data.message) ||
        'Too many requests from this connection. Please wait 15 minutes before submitting another inquiry.'
      );
      err.status = 429;
      throw err;
    }

    const message = (data && data.message) || (data && data.error) || 'An unexpected error occurred. Please try again.';
    const err = new Error(message);
    err.status = res.status;
    err.details = (data && data.errors) || null;
    throw err;
  }

  return data;
}

/**
 * Submit an enquiry form
 * @param {Object} payload
 */
export async function submitEnquiry(payload) {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return await handleResponse(res);
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const networkError = new Error('Network connection error. Please check your internet connection and try again.');
      networkError.status = 0;
      throw networkError;
    }
    throw err;
  }
}

/**
 * Fetch published projects / case studies
 * @param {string} [category]
 */
export async function fetchProjects(category) {
  const url = category && category !== 'all'
    ? `${API_BASE}/projects?category=${encodeURIComponent(category)}`
    : `${API_BASE}/projects`;
  const res = await fetch(url);
  return handleResponse(res);
}

/**
 * Check backend health status
 */
export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await handleResponse(res);
  } catch (err) {
    return { status: 'down', error: err.message };
  }
}
