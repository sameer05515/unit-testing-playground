// Global utility functions for the Gold Rate application

const API_BASE_URL = '/api/gold-rates';

// Format currency in Indian Rupees
function formatCurrency(amount) {
    return '₹' + parseFloat(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Format percentage
function formatPercentage(value) {
    const sign = value >= 0 ? '+' : '';
    return sign + value.toFixed(2) + '%';
}

// Show loading state
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Loading...</div>';
    }
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Handle API errors
function handleApiError(error) {
    console.error('API Error:', error);
    return `Error: ${error.message || 'Failed to fetch data'}`;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_BASE_URL,
        formatCurrency,
        formatPercentage,
        showLoading,
        showError,
        handleApiError
    };
}

