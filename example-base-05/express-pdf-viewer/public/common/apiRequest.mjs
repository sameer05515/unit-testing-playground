export default async function apiRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error.message);
      throw error;
    }
  }
  