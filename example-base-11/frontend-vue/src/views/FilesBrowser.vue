<template>
  <div class="container-fluid mt-3">
    <!-- Filters and Search -->
    <div class="card mb-3">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Search</label>
            <input 
              type="text" 
              class="form-control" 
              v-model="filters.search" 
              placeholder="Search by name or path..."
              @keyup.enter="loadFiles(1)"
            >
          </div>
          <div class="col-md-2">
            <label class="form-label">Type</label>
            <select class="form-select" v-model="filters.type">
              <option value="">All Types</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="song">Song</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Extension</label>
            <select class="form-select" v-model="filters.extension">
              <option value="">All Extensions</option>
              <option value=".mp4">.mp4</option>
              <option value=".mp3">.mp3</option>
              <option value=".pdf">.pdf</option>
              <option value=".jpg">.jpg</option>
              <option value=".jpeg">.jpeg</option>
              <option value=".flv">.flv</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Min Size</label>
            <select class="form-select" v-model="filters.minSize">
              <option value="">No Minimum</option>
              <option value="1KB">1 KB</option>
              <option value="100KB">100 KB</option>
              <option value="1MB">1 MB</option>
              <option value="10MB">10 MB</option>
              <option value="100MB">100 MB</option>
              <option value="1GB">1 GB</option>
              <option value="5GB">5 GB</option>
              <option value="10GB">10 GB</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label">Max Size</label>
            <select class="form-select" v-model="filters.maxSize">
              <option value="">No Maximum</option>
              <option value="1MB">1 MB</option>
              <option value="10MB">10 MB</option>
              <option value="100MB">100 MB</option>
              <option value="1GB">1 GB</option>
              <option value="5GB">5 GB</option>
              <option value="10GB">10 GB</option>
              <option value="50GB">50 GB</option>
              <option value="100GB">100 GB</option>
            </select>
          </div>
          <div class="col-md-1">
            <label class="form-label">Sort</label>
            <select class="form-select" v-model="sortBy">
              <option value="path">Path</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
              <option value="modified">Modified</option>
            </select>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12">
            <button class="btn btn-primary" @click="loadFiles(1)">
              <i class="bi bi-search"></i> Apply Filters
            </button>
            <button class="btn btn-secondary" @click="resetFilters">
              <i class="bi bi-arrow-counterclockwise"></i> Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Card -->
    <div class="card mb-3" v-if="stats">
      <div class="card-header">
        <h5 class="mb-0"><i class="bi bi-bar-chart"></i> Statistics</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="stats-card p-3">
              <div class="text-muted">Total Files</div>
              <div class="stats-value">{{ stats.totalFiles?.toLocaleString() }}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card p-3">
              <div class="text-muted">Total Size</div>
              <div class="stats-value">{{ stats.totalSizeFormatted }}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card p-3">
              <div class="text-muted">Scan Date</div>
              <div class="stats-value" style="font-size: 1rem;">{{ formatDate(stats.scanDate) }}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card p-3">
              <div class="text-muted">Scan Duration</div>
              <div class="stats-value" style="font-size: 1rem;">{{ stats.scanDuration }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Files Table -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-list-ul"></i> Files</h5>
        <div class="d-flex align-items-center gap-2">
          <button 
            class="btn btn-sm btn-danger" 
            v-if="selectedFiles.length > 0"
            @click="deleteSelected"
          >
            <i class="bi bi-trash"></i> Delete Selected ({{ selectedFiles.length }})
          </button>
          <span class="badge bg-secondary">{{ fileCount }}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive" style="max-height: 70vh; overflow-y: auto;">
          <table class="table table-hover table-striped">
            <thead class="table-dark sticky-top">
              <tr>
                <th style="width: 40px;">
                  <input 
                    type="checkbox" 
                    :checked="allSelected" 
                    :indeterminate="someSelected"
                    @change="toggleSelectAll"
                    title="Select All"
                  >
                </th>
                <th>Name</th>
                <th>Type</th>
                <th>Extension</th>
                <th>Size</th>
                <th>Modified</th>
                <th>Path</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="8" class="text-center">
                  <div class="spinner-border text-primary" role="status"></div>
                </td>
              </tr>
              <tr v-else-if="files.length === 0">
                <td colspan="8" class="text-center text-muted">No files found</td>
              </tr>
              <tr v-for="file in files" :key="file.slug">
                <td>
                  <input 
                    type="checkbox" 
                    :value="file.slug"
                    v-model="selectedFiles"
                  >
                </td>
                <td>
                  <i :class="`bi bi-${getTypeIcon(file.extensionType)} file-icon`"></i>
                  <strong>{{ file.name }}</strong>
                </td>
                <td>
                  <span :class="`badge badge-type-${file.extensionType}`">
                    {{ file.extensionType }}
                  </span>
                </td>
                <td><code>{{ file.extension }}</code></td>
                <td>{{ file.sizeFormatted }}</td>
                <td>{{ formatDate(file.modified) }}</td>
                <td>
                  <span class="file-path" :title="file.path">
                    {{ file.path }}
                  </span>
                </td>
                <td>
                  <button 
                    class="btn btn-sm btn-primary" 
                    @click="viewFileDetails(file.slug)"
                    title="View Details"
                  >
                    <i class="bi bi-info-circle"></i> Details
                  </button>
                  <button 
                    class="btn btn-sm btn-success ms-1" 
                    @click="openViewer(file.slug)"
                    title="Open in Viewer"
                  >
                    <i class="bi bi-play-circle"></i> View
                  </button>
                  <button 
                    class="btn btn-sm btn-danger ms-1" 
                    @click="deleteFile(file.slug, file.name)"
                    title="Delete File"
                  >
                    <i class="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <nav v-if="pagination.totalPages > 1" aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: pagination.page === 1 }">
              <a class="page-link" href="#" @click.prevent="loadFiles(pagination.page - 1)">Previous</a>
            </li>
            <li 
              v-for="page in getPageNumbers()" 
              :key="page"
              class="page-item" 
              :class="{ active: page === pagination.page }"
            >
              <a class="page-link" href="#" @click.prevent="loadFiles(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: pagination.page === pagination.totalPages }">
              <a class="page-link" href="#" @click.prevent="loadFiles(pagination.page + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- File Details Modal -->
    <div class="modal fade" :class="{ show: showDetailsModal, 'd-block': showDetailsModal }" v-if="showDetailsModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">File Details</h5>
            <button type="button" class="btn-close" @click="showDetailsModal = false"></button>
          </div>
          <div class="modal-body" v-if="selectedFile">
            <div class="file-details-item">
              <div class="file-details-label">Slug:</div>
              <div><code>{{ selectedFile.slug }}</code></div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Name:</div>
              <div><strong>{{ selectedFile.name }}</strong></div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Type:</div>
              <div>
                <span :class="`badge badge-type-${selectedFile.extensionType}`">
                  {{ selectedFile.extensionType }}
                </span>
              </div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Extension:</div>
              <div><code>{{ selectedFile.extension }}</code></div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Size:</div>
              <div>{{ selectedFile.sizeFormatted }} ({{ selectedFile.size.toLocaleString() }} bytes)</div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Path:</div>
              <div><code class="file-path">{{ selectedFile.path }}</code></div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Created:</div>
              <div>{{ formatDate(selectedFile.created) }}</div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Modified:</div>
              <div>{{ formatDate(selectedFile.modified) }}</div>
            </div>
            <div class="file-details-item">
              <div class="file-details-label">Accessed:</div>
              <div>{{ formatDate(selectedFile.accessed) }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showDetailsModal = false">Close</button>
            <button 
              v-if="selectedFile"
              class="btn btn-success" 
              @click="openViewer(selectedFile.slug); showDetailsModal = false"
            >
              <i class="bi bi-play-circle"></i> Open in Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetailsModal" class="modal-backdrop fade show" @click="showDetailsModal = false"></div>

    <!-- Universal Viewer Modal -->
    <div class="modal fade" :class="{ show: showViewerModal, 'd-block': showViewerModal }" v-if="showViewerModal" style="background-color: rgba(0,0,0,0.9);">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content" style="background-color: #000;">
          <div class="modal-header border-secondary" style="background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex justify-content-between align-items-center w-100">
              <div>
                <h5 class="modal-title text-white mb-0" v-if="viewerFile">
                  <i :class="`bi bi-${getTypeIcon(viewerFile.extensionType)}`"></i>
                  {{ viewerFile.name }}
                </h5>
                <div class="file-info text-muted small mt-1" v-if="viewerFile">
                  <span :class="`badge badge-type-${viewerFile.extensionType}`">{{ viewerFile.extensionType }}</span>
                  <span class="ms-2">{{ viewerFile.sizeFormatted }}</span>
                  <span class="ms-2">{{ viewerFile.extension }}</span>
                </div>
              </div>
              <div>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-light me-2" 
                  v-if="viewerFile && (viewerFile.extensionType === 'video' || viewerFile.extensionType === 'image')"
                  @click="downloadFile(viewerFile.slug)"
                >
                  <i class="bi bi-download"></i>
                </button>
                <button type="button" class="btn-close btn-close-white" @click="showViewerModal = false"></button>
              </div>
            </div>
          </div>
          <div class="modal-body p-0" style="height: calc(100vh - 120px); overflow: auto; display: flex; align-items: center; justify-content: center;">
            <div v-if="viewerFile" class="w-100 h-100 d-flex align-items-center justify-content-center">
              <img 
                v-if="viewerFile.extensionType === 'image'"
                :src="`/file/${viewerFile.slug}`"
                :alt="viewerFile.name"
                style="max-width: 100%; max-height: 100%; object-fit: contain;"
                class="img-fluid"
              >
              <video 
                v-else-if="viewerFile.extensionType === 'video'"
                controls
                autoplay
                style="max-width: 100%; max-height: 100%;"
              >
                <source :src="`/file/${viewerFile.slug}`" :type="`video/${viewerFile.extension === '.mp4' ? 'mp4' : 'x-flv'}`">
                Your browser does not support the video tag.
              </video>
              <div v-else-if="viewerFile.extensionType === 'song'" class="text-center w-100">
                <audio controls autoplay style="width: 80%; max-width: 600px;">
                  <source :src="`/file/${viewerFile.slug}`" type="audio/mpeg">
                  Your browser does not support the audio tag.
                </audio>
                <div class="mt-4 text-white">
                  <h4>{{ viewerFile.name }}</h4>
                  <p class="text-muted">{{ viewerFile.sizeFormatted }}</p>
                </div>
              </div>
              <iframe 
                v-else-if="viewerFile.extensionType === 'pdf'"
                :src="`/file/${viewerFile.slug}`"
                style="width: 100%; height: 100%; border: none;"
              ></iframe>
            </div>
          </div>
          <div class="modal-footer border-secondary" style="background-color: rgba(0, 0, 0, 0.8);">
            <div class="d-flex justify-content-between w-100 align-items-center">
              <div>
                <button 
                  type="button" 
                  class="btn btn-outline-light" 
                  v-if="viewerNavigation?.prev"
                  @click="openViewer(viewerNavigation.prev.slug)"
                >
                  <i class="bi bi-chevron-left"></i> Previous
                </button>
              </div>
              <div>
                <button type="button" class="btn btn-secondary" @click="showViewerModal = false">Close</button>
              </div>
              <div>
                <button 
                  type="button" 
                  class="btn btn-outline-light" 
                  v-if="viewerNavigation?.next"
                  @click="openViewer(viewerNavigation.next.slug)"
                >
                  Next <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showViewerModal" class="modal-backdrop fade show" @click="showViewerModal = false"></div>
  </div>
</template>

<script>
import mediaFilesAPI from '../api/mediaFiles.js';

export default {
  name: 'FilesBrowser',
  data() {
    return {
      files: [],
      stats: null,
      loading: false,
      filters: {
        search: '',
        type: '',
        extension: '',
        minSize: '',
        maxSize: ''
      },
      sortBy: 'path',
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0
      },
      selectedFiles: [],
      showDetailsModal: false,
      selectedFile: null,
      showViewerModal: false,
      viewerFile: null,
      viewerNavigation: null
    };
  },
  computed: {
    fileCount() {
      return `${this.pagination.total.toLocaleString()} files (showing ${this.files.length})`;
    },
    allSelected() {
      return this.files.length > 0 && this.selectedFiles.length === this.files.length;
    },
    someSelected() {
      return this.selectedFiles.length > 0 && this.selectedFiles.length < this.files.length;
    }
  },
  mounted() {
    this.loadStats();
    this.loadFiles(1);
  },
  methods: {
    async loadStats() {
      try {
        const response = await mediaFilesAPI.getStats();
        this.stats = response.data;
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    },
    async loadFiles(page = 1) {
      this.loading = true;
      try {
        const params = {
          page,
          limit: this.pagination.limit,
          sortBy: this.sortBy,
          sortOrder: 'asc'
        };
        
        if (this.filters.search) params.search = this.filters.search;
        if (this.filters.type) params.type = this.filters.type;
        if (this.filters.extension) params.extension = this.filters.extension;
        if (this.filters.minSize) params.minSize = this.filters.minSize;
        if (this.filters.maxSize) params.maxSize = this.filters.maxSize;
        
        const response = await mediaFilesAPI.getFiles(params);
        this.files = response.data.files;
        this.pagination = {
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          totalPages: response.data.totalPages
        };
        this.selectedFiles = [];
      } catch (error) {
        console.error('Error loading files:', error);
        this.files = [];
      } finally {
        this.loading = false;
      }
    },
    resetFilters() {
      this.filters = {
        search: '',
        type: '',
        extension: '',
        minSize: '',
        maxSize: ''
      };
      this.sortBy = 'path';
      this.loadFiles(1);
    },
    async viewFileDetails(slug) {
      try {
        const response = await mediaFilesAPI.getFileBySlug(slug);
        this.selectedFile = response.data.file;
        this.showDetailsModal = true;
      } catch (error) {
        console.error('Error loading file details:', error);
        alert('Error loading file details: ' + error.message);
      }
    },
    async openViewer(slug) {
      try {
        const response = await mediaFilesAPI.getFileBySlug(slug);
        this.viewerFile = response.data.file;
        this.viewerNavigation = response.data.navigation;
        this.showViewerModal = true;
      } catch (error) {
        console.error('Error loading file for viewer:', error);
        alert('Error loading file: ' + error.message);
      }
    },
    async deleteFile(slug, fileName) {
      if (!confirm(`Are you sure you want to delete "${fileName}"?\n\nThis will delete the file from disk and remove it from the list.\n\nThis action cannot be undone!`)) {
        return;
      }
      
      try {
        await mediaFilesAPI.deleteFile(slug);
        alert(`File deleted successfully!\n\nFile: ${fileName}`);
        this.loadFiles(this.pagination.page);
        this.loadStats();
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Error deleting file: ' + (error.response?.data?.message || error.message));
      }
    },
    async deleteSelected() {
      if (this.selectedFiles.length === 0) {
        alert('No files selected');
        return;
      }
      
      if (!confirm(`Are you sure you want to delete ${this.selectedFiles.length} file(s)?\n\nThis action cannot be undone!`)) {
        return;
      }
      
      try {
        const response = await mediaFilesAPI.bulkDeleteFiles(this.selectedFiles);
        const result = response.data;
        const msg = `Successfully deleted ${result.deleted} file(s)!\n${result.failed > 0 ? `Failed to delete ${result.failed} file(s).` : ''}`;
        alert(msg);
        this.selectedFiles = [];
        this.loadFiles(this.pagination.page);
        this.loadStats();
      } catch (error) {
        console.error('Error deleting files:', error);
        alert('Error deleting files: ' + (error.response?.data?.message || error.message));
      }
    },
    toggleSelectAll() {
      if (this.allSelected) {
        this.selectedFiles = [];
      } else {
        this.selectedFiles = this.files.map(f => f.slug);
      }
    },
    getPageNumbers() {
      const pages = [];
      const startPage = Math.max(1, this.pagination.page - 2);
      const endPage = Math.min(this.pagination.totalPages, this.pagination.page + 2);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
    getTypeIcon(type) {
      const icons = {
        'image': 'image',
        'video': 'play-circle',
        'song': 'music-note-beamed',
        'pdf': 'file-earmark-pdf'
      };
      return icons[type] || 'file';
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    downloadFile(slug) {
      window.location.href = `/file/${slug}?download=true`;
    }
  }
};
</script>

<style scoped>
.stats-card {
  border-left: 4px solid #0d6efd;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #0d6efd;
}

.file-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.file-path {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: #6c757d;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge-type-image {
  background-color: #ffc107;
  color: #000;
}

.badge-type-video {
  background-color: #dc3545;
}

.badge-type-song {
  background-color: #0d6efd;
}

.badge-type-pdf {
  background-color: #198754;
}

.file-details-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.file-details-item:last-child {
  border-bottom: none;
}

.file-details-label {
  font-weight: 600;
  color: #495057;
  min-width: 150px;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>

