const API_BASE = import.meta.env.VITE_API_BASE || '';

async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // If response is not JSON, use status text
      }
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to connect to API server. Please ensure the backend is running on http://localhost:3030`);
    }
    throw error;
  }
}

export const apiClient = {
  async getFiles() {
    const url = `${API_BASE}/api/files`;
    console.log('Fetching files from:', url);
    return fetchWithErrorHandling(url);
  },

  async getFileBySlug(slug) {
    const encodedSlug = encodeURIComponent(slug);
    const url = `${API_BASE}/api/files/${encodedSlug}`;
    console.log('Fetching file from:', url);
    return fetchWithErrorHandling(url);
  }
};

