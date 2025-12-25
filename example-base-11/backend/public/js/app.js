// Global state
let currentPage = 1;
let currentLimit = 50;
let currentFilters = {};

// Load statistics on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    loadFiles();
});

// Load statistics
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
            throw new Error('Failed to load statistics');
        }
        const stats = await response.json();
        displayStats(stats);
    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('stats-badge').textContent = 'Error loading stats';
    }
}

// Display statistics
function displayStats(stats) {
    // Update navbar badge
    document.getElementById('stats-badge').textContent = 
        `${stats.totalFiles} files | ${stats.totalSizeFormatted}`;

    // Display detailed stats
    const statsContent = document.getElementById('statsContent');
    statsContent.innerHTML = `
        <div class="row">
            <div class="col-md-3">
                <div class="stats-card p-3">
                    <div class="text-muted">Total Files</div>
                    <div class="stats-value">${stats.totalFiles.toLocaleString()}</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card p-3">
                    <div class="text-muted">Total Size</div>
                    <div class="stats-value">${stats.totalSizeFormatted}</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card p-3">
                    <div class="text-muted">Scan Date</div>
                    <div class="stats-value" style="font-size: 1rem;">${new Date(stats.scanDate).toLocaleString()}</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stats-card p-3">
                    <div class="text-muted">Scan Duration</div>
                    <div class="stats-value" style="font-size: 1rem;">${stats.scanDuration}</div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-6">
                <h6>Files by Type</h6>
                <ul class="list-group">
                    ${Object.entries(stats.filesByType).map(([type, count]) => `
                        <li class="list-group-item d-flex justify-content-between">
                            <span><i class="bi bi-${getTypeIcon(type)}"></i> ${type}</span>
                            <span class="badge bg-primary">${count.toLocaleString()}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="col-md-6">
                <h6>Files by Extension</h6>
                <ul class="list-group">
                    ${Object.entries(stats.filesByExtension).map(([ext, count]) => `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>${ext}</span>
                            <span class="badge bg-secondary">${count.toLocaleString()}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
    document.getElementById('statsRow').style.display = 'block';
}

// Get icon for file type
function getTypeIcon(type) {
    const icons = {
        'image': 'image',
        'video': 'play-circle',
        'song': 'music-note-beamed',
        'pdf': 'file-earmark-pdf'
    };
    return icons[type] || 'file';
}

// Load files with filters
async function loadFiles(page = 1) {
    currentPage = page;
    
    // Get filter values
    const search = document.getElementById('searchInput').value.trim();
    const type = document.getElementById('typeFilter').value;
    const extension = document.getElementById('extensionFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    // Build query params
    const params = new URLSearchParams({
        page: page,
        limit: currentLimit,
        sortBy: sortBy,
        sortOrder: 'asc'
    });

    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (extension) params.append('extension', extension);

    try {
        const response = await fetch(`/api/files?${params}`);
        if (!response.ok) {
            throw new Error('Failed to load files');
        }
        const data = await response.json();
        displayFiles(data.files);
        displayPagination(data);
        document.getElementById('fileCount').textContent = 
            `${data.total.toLocaleString()} files (showing ${data.files.length})`;
    } catch (error) {
        console.error('Error loading files:', error);
        document.getElementById('filesTableBody').innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Error loading files: ${error.message}
                </td>
            </tr>
        `;
    }
}

// Display files in table
function displayFiles(files) {
    const tbody = document.getElementById('filesTableBody');
    
    if (files.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted">
                    No files found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = files.map(file => `
        <tr>
            <td>
                <i class="bi bi-${getTypeIcon(file.extensionType)} file-icon"></i>
                <strong>${escapeHtml(file.name)}</strong>
            </td>
            <td>
                <span class="badge badge-type-${file.extensionType}">
                    ${file.extensionType}
                </span>
            </td>
            <td><code>${file.extension}</code></td>
            <td>${file.sizeFormatted}</td>
            <td>${new Date(file.modified).toLocaleDateString()}</td>
            <td>
                <span class="file-path" title="${escapeHtml(file.path)}">
                    ${escapeHtml(file.path)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewFileDetails('${file.slug}')" title="View Details">
                    <i class="bi bi-info-circle"></i> Details
                </button>
                <button class="btn btn-sm btn-success ms-1" onclick="openViewer('${file.slug}')" title="Open in Viewer">
                    <i class="bi bi-play-circle"></i> View
                </button>
            </td>
        </tr>
    `).join('');
}

// Display pagination
function displayPagination(data) {
    const paginationNav = document.getElementById('paginationNav');
    const pagination = document.getElementById('pagination');
    
    if (data.totalPages <= 1) {
        paginationNav.style.display = 'none';
        return;
    }

    paginationNav.style.display = 'block';
    
    let html = '';
    
    // Previous button
    html += `
        <li class="page-item ${data.page === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadFiles(${data.page - 1}); return false;">
                Previous
            </a>
        </li>
    `;

    // Page numbers
    const startPage = Math.max(1, data.page - 2);
    const endPage = Math.min(data.totalPages, data.page + 2);

    if (startPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="#" onclick="loadFiles(1); return false;">1</a></li>`;
        if (startPage > 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `
            <li class="page-item ${i === data.page ? 'active' : ''}">
                <a class="page-link" href="#" onclick="loadFiles(${i}); return false;">
                    ${i}
                </a>
            </li>
        `;
    }

    if (endPage < data.totalPages) {
        if (endPage < data.totalPages - 1) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        html += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="loadFiles(${data.totalPages}); return false;">
                    ${data.totalPages}
                </a>
            </li>
        `;
    }

    // Next button
    html += `
        <li class="page-item ${data.page === data.totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="loadFiles(${data.page + 1}); return false;">
                Next
            </a>
        </li>
    `;

    pagination.innerHTML = html;
}

// View file details
async function viewFileDetails(slug) {
    try {
        const response = await fetch(`/api/files/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to load file details');
        }
        const data = await response.json();
        displayFileDetails(data);
    } catch (error) {
        console.error('Error loading file details:', error);
        alert('Error loading file details: ' + error.message);
    }
}

// Display file details in modal
function displayFileDetails(data) {
    const file = data.file;
    const content = document.getElementById('fileDetailsContent');
    
    content.innerHTML = `
        <div class="file-details-item">
            <div class="file-details-label">Slug:</div>
            <div><code>${file.slug}</code></div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Name:</div>
            <div><strong>${escapeHtml(file.name)}</strong></div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Type:</div>
            <div>
                <span class="badge badge-type-${file.extensionType}">
                    ${file.extensionType}
                </span>
            </div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Extension:</div>
            <div><code>${file.extension}</code></div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Size:</div>
            <div>${file.sizeFormatted} (${file.size.toLocaleString()} bytes)</div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Path:</div>
            <div><code class="file-path">${escapeHtml(file.path)}</code></div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Created:</div>
            <div>${new Date(file.created).toLocaleString()}</div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Modified:</div>
            <div>${new Date(file.modified).toLocaleString()}</div>
        </div>
        <div class="file-details-item">
            <div class="file-details-label">Accessed:</div>
            <div>${new Date(file.accessed).toLocaleString()}</div>
        </div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <div>
                ${data.navigation.prev || data.navigation.next ? `
                    <div class="btn-group">
                        ${data.navigation.prev ? `
                            <button class="btn btn-outline-primary" onclick="viewFileDetails('${data.navigation.prev.slug}')">
                                <i class="bi bi-arrow-left"></i> Previous
                            </button>
                        ` : ''}
                        ${data.navigation.next ? `
                            <button class="btn btn-outline-primary" onclick="viewFileDetails('${data.navigation.next.slug}')">
                                Next <i class="bi bi-arrow-right"></i>
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
            <div>
                <button class="btn btn-success" onclick="openViewer('${file.slug}'); bootstrap.Modal.getInstance(document.getElementById('fileDetailsModal')).hide();">
                    <i class="bi bi-play-circle"></i> Open in Viewer
                </button>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('fileDetailsModal'));
    modal.show();
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('extensionFilter').value = '';
    document.getElementById('sortBy').value = 'path';
    loadFiles(1);
}

// Open universal viewer in popup
function openViewer(slug) {
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.9;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    const viewerWindow = window.open(
        `/viewer/${slug}`,
        'universalViewer',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no`
    );
    
    if (!viewerWindow) {
        alert('Please allow popups for this site to view files');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow Enter key to trigger search
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadFiles(1);
    }
});

