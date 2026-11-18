// Dilip Visuals API Client Layer

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

async function apiRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const url = `${BACKEND_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP error ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.warn(`[API fetch to ${endpoint}]`, error.message);
    throw error;
  }
}

export const api = {
  // Enquiries
  submitEnquiry: (data: any) => apiRequest('/api/enquiries', { method: 'POST', body: JSON.stringify(data) }),

  // Services, Pricing & Content
  getServices: () => apiRequest('/api/services'),
  getPricing: () => apiRequest('/api/pricing'),
  getContent: () => apiRequest('/api/content'),

  // Health
  getHealth: () => apiRequest('/api/health')
};
