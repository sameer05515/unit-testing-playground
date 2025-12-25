// Global state
let currentPage = 1;
let currentLimit = 50;
let currentFilters = {};

// Load statistics on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStats();
    updateRemoveButtons(); // Initialize remove buttons visibility
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

// Get sort criteria from UI
function getSortCriteria() {
    const sortItems = document.querySelectorAll('.sort-item');
    const sorts = [];
    
    sortItems.forEach(item => {
        const field = item.querySelector('.sort-field').value;
        const order = item.querySelector('.sort-order').value;
        
        if (field && field.trim()) {
            sorts.push(`${field}:${order}`);
        }
    });
    
    return sorts.length > 0 ? sorts.join(',') : null;
}

// Load files with filters
async function loadFiles(page = 1) {
    currentPage = page;
    
    // Get filter values
    const search = document.getElementById('searchInput').value.trim();
    const type = document.getElementById('typeFilter').value;
    const extension = document.getElementById('extensionFilter').value;
    const minSize = document.getElementById('minSizeFilter').value;
    const maxSize = document.getElementById('maxSizeFilter').value;
    const sortCriteria = getSortCriteria();

    // Build query params
    const params = new URLSearchParams({
        page: page,
        limit: currentLimit
    });

    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (extension) params.append('extension', extension);
    if (minSize) params.append('minSize', minSize);
    if (maxSize) params.append('maxSize', maxSize);
    if (sortCriteria) {
        params.append('sort', sortCriteria);
    }

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
                <button class="btn btn-success" onclick="bootstrap.Modal.getInstance(document.getElementById('fileDetailsModal')).hide(); setTimeout(() => openViewer('${file.slug}'), 300);">
                    <i class="bi bi-play-circle"></i> Open in Viewer
                </button>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('fileDetailsModal'));
    modal.show();
}

// Add sort item
function addSortItem() {
    const container = document.getElementById('sortContainer');
    const newItem = document.createElement('div');
    newItem.className = 'sort-item row g-2 mb-2';
    newItem.innerHTML = `
        <div class="col-md-5">
            <select class="form-select sort-field">
                <option value="">-- Select Sort Field --</option>
                <option value="path">Path</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Modified Date</option>
                <option value="created">Created Date</option>
                <option value="extension">Extension</option>
                <option value="extensionType">Type</option>
            </select>
        </div>
        <div class="col-md-3">
            <select class="form-select sort-order">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div class="col-md-2">
            <button type="button" class="btn btn-sm btn-outline-danger remove-sort" onclick="removeSortItem(this)">
                <i class="bi bi-trash"></i> Remove
            </button>
        </div>
    `;
    container.appendChild(newItem);
    updateRemoveButtons();
}

// Remove sort item
function removeSortItem(button) {
    const item = button.closest('.sort-item');
    item.remove();
    updateRemoveButtons();
}

// Update remove buttons visibility
function updateRemoveButtons() {
    const sortItems = document.querySelectorAll('.sort-item');
    const removeButtons = document.querySelectorAll('.remove-sort');
    
    // Show remove button only if there's more than one sort item
    removeButtons.forEach(btn => {
        btn.style.display = sortItems.length > 1 ? 'block' : 'none';
    });
}

// Reset filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('extensionFilter').value = '';
    document.getElementById('minSizeFilter').value = '';
    document.getElementById('maxSizeFilter').value = '';
    
    // Reset sort to single default
    const sortContainer = document.getElementById('sortContainer');
    sortContainer.innerHTML = `
        <div class="sort-item row g-2 mb-2">
            <div class="col-md-5">
                <select class="form-select sort-field">
                    <option value="">-- Select Sort Field --</option>
                    <option value="path" selected>Path</option>
                    <option value="name">Name</option>
                    <option value="size">Size</option>
                    <option value="modified">Modified Date</option>
                    <option value="created">Created Date</option>
                    <option value="extension">Extension</option>
                    <option value="extensionType">Type</option>
                </select>
            </div>
            <div class="col-md-3">
                <select class="form-select sort-order">
                    <option value="asc" selected>Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-sm btn-outline-danger remove-sort" style="display: none;" onclick="removeSortItem(this)">
                    <i class="bi bi-trash"></i> Remove
                </button>
            </div>
        </div>
    `;
    updateRemoveButtons();
    loadFiles(1);
}

// Current viewer file data
let currentViewerFile = null;
let currentViewerNavigation = null;

// Open universal viewer in modal
async function openViewer(slug) {
    try {
        const response = await fetch(`/api/files/${slug}`);
        if (!response.ok) {
            throw new Error('Failed to load file');
        }
        const data = await response.json();
        currentViewerFile = data.file;
        currentViewerNavigation = data.navigation;
        
        displayViewer(data);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('universalViewerModal'));
        modal.show();
    } catch (error) {
        console.error('Error loading file for viewer:', error);
        alert('Error loading file: ' + error.message);
    }
}

// Display content in viewer modal
function displayViewer(data) {
    const file = data.file;
    const navigation = data.navigation;
    
    // Update header
    const typeIcons = {
        'image': 'image',
        'video': 'play-circle',
        'song': 'music-note-beamed',
        'pdf': 'file-earmark-pdf'
    };
    const icon = typeIcons[file.extensionType] || 'file';
    
    document.getElementById('viewerIcon').className = `bi bi-${icon}`;
    document.getElementById('viewerFileName').textContent = file.name;
    document.getElementById('viewerTypeBadge').textContent = file.extensionType;
    document.getElementById('viewerTypeBadge').className = `badge badge-type-${file.extensionType}`;
    document.getElementById('viewerFileSize').textContent = file.sizeFormatted;
    document.getElementById('viewerFileExtension').textContent = file.extension;
    
    // Show/hide navigation buttons
    document.getElementById('viewerPrevBtn').style.display = navigation.prev ? 'block' : 'none';
    document.getElementById('viewerNextBtn').style.display = navigation.next ? 'block' : 'none';
    
    // Show/hide action buttons based on file type
    const downloadBtn = document.getElementById('viewerDownloadBtn');
    const fullscreenBtn = document.getElementById('viewerFullscreenBtn');
    
    if (file.extensionType === 'video' || file.extensionType === 'image') {
        downloadBtn.style.display = 'block';
        if (file.extensionType === 'video') {
            fullscreenBtn.style.display = 'block';
        } else {
            fullscreenBtn.style.display = 'none';
        }
    } else {
        downloadBtn.style.display = 'block';
        fullscreenBtn.style.display = 'none';
    }
    
    // Display content based on type
    const contentDiv = document.getElementById('viewerContent');
    
    if (file.extensionType === 'image') {
        contentDiv.innerHTML = `
            <img src="/file/${file.slug}" alt="${escapeHtml(file.name)}" 
                 style="max-width: 100%; max-height: 100%; object-fit: contain;" 
                 class="img-fluid">
        `;
    } else if (file.extensionType === 'video') {
        contentDiv.innerHTML = `
            <video controls autoplay style="max-width: 100%; max-height: 100%;" id="viewerVideo">
                <source src="/file/${file.slug}" type="video/${file.extension === '.mp4' ? 'mp4' : 'x-flv'}">
                Your browser does not support the video tag.
            </video>
        `;
    } else if (file.extensionType === 'song') {
        contentDiv.innerHTML = `
            <div class="text-center w-100">
                <audio controls autoplay style="width: 80%; max-width: 600px;" id="viewerAudio">
                    <source src="/file/${file.slug}" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio>
                <div class="mt-4 text-white">
                    <h4>${escapeHtml(file.name)}</h4>
                    <p class="text-muted">${file.sizeFormatted}</p>
                </div>
            </div>
        `;
    } else if (file.extensionType === 'pdf') {
        contentDiv.innerHTML = `
            <iframe src="/file/${file.slug}" 
                    style="width: 100%; height: 100%; border: none;" 
                    id="viewerIframe"></iframe>
        `;
    } else {
        contentDiv.innerHTML = `
            <div class="text-center text-white">
                <i class="bi bi-file-earmark-x" style="font-size: 4rem;"></i>
                <h3>Unsupported File Type</h3>
                <p>This file type cannot be previewed in the browser.</p>
                <p class="text-muted">File: ${escapeHtml(file.name)}</p>
                <p class="text-muted">Path: ${escapeHtml(file.path)}</p>
            </div>
        `;
    }
}

// Navigate viewer (prev/next)
function navigateViewer(direction) {
    if (!currentViewerNavigation) return;
    
    const targetSlug = direction === 'prev' 
        ? currentViewerNavigation.prev?.slug 
        : currentViewerNavigation.next?.slug;
    
    if (targetSlug) {
        openViewer(targetSlug);
    }
}

// Download file from viewer
function downloadViewerFile() {
    if (currentViewerFile) {
        window.location.href = `/file/${currentViewerFile.slug}?download=true`;
    }
}

// Toggle fullscreen for video
function toggleViewerFullscreen() {
    const video = document.getElementById('viewerVideo');
    if (video) {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Keyboard navigation for viewer modal
document.addEventListener('keydown', (e) => {
    const viewerModal = document.getElementById('universalViewerModal');
    if (viewerModal && viewerModal.classList.contains('show')) {
        if (e.key === 'ArrowLeft' && currentViewerNavigation?.prev) {
            navigateViewer('prev');
        } else if (e.key === 'ArrowRight' && currentViewerNavigation?.next) {
            navigateViewer('next');
        } else if (e.key === 'Escape') {
            const modal = bootstrap.Modal.getInstance(viewerModal);
            if (modal) modal.hide();
        }
    }
});

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

