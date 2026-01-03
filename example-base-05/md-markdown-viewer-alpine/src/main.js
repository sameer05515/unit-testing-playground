import Alpine from 'alpinejs';
import { renderMarkdown } from './lib/markdown.js';
import { apiClient } from './api/client.js';

window.Alpine = Alpine;

Alpine.data('markdownExplorer', () => ({
  files: [],
  activeFile: null,
  renderedContent: '',
  loading: false,
  error: null,
  filter: '',
  sidebarOpen: true,

  get filteredFiles() {
    if (!this.filter.trim()) return this.files;
    const query = this.filter.toLowerCase();
    return this.files.filter(file => 
      file.name.toLowerCase().includes(query) ||
      file.relativePath.toLowerCase().includes(query)
    );
  },

  async init() {
    try {
      await this.loadFiles();
      
      // Only proceed with file selection if files loaded successfully
      if (this.error || this.files.length === 0) {
        return;
      }

      const urlSlug = new URLSearchParams(window.location.search).get('slug');
      if (urlSlug && this.files.length > 0) {
        const file = this.files.find(f => f.slug === urlSlug);
        if (file) {
          await this.selectFile(file.slug);
        } else {
          await this.selectFile(this.files[0].slug);
        }
      } else if (this.files.length > 0) {
        await this.selectFile(this.files[0].slug);
      }
    } catch (err) {
      console.error('Error in init:', err);
      this.error = err.message || 'Failed to initialize';
    }
    
    // Sync URL on file selection
    this.$watch('activeFile', (file) => {
      if (file) {
        const url = new URL(window.location);
        url.searchParams.set('slug', file.slug);
        window.history.replaceState({}, '', url);
      }
    });
  },

  async loadFiles() {
    this.loading = true;
    this.error = null;
    try {
      const response = await apiClient.getFiles();
      this.files = response.files || [];
      if (this.files.length === 0) {
        this.error = 'No markdown files found. Please check your configuration.';
      }
    } catch (err) {
      this.error = err.message || 'Failed to load markdown files';
      console.error('Error loading files:', err);
      this.files = [];
    } finally {
      this.loading = false;
    }
  },

  async refreshFiles() {
    await this.loadFiles();
    if (this.activeFile && this.files.length > 0) {
      const updated = this.files.find(f => f.slug === this.activeFile.slug);
      if (updated) {
        await this.selectFile(updated.slug, false);
      } else {
        await this.selectFile(this.files[0].slug);
      }
    } else if (this.files.length > 0) {
      await this.selectFile(this.files[0].slug);
    }
  },

  async selectFile(slug, scrollTo = true) {
    const file = this.files.find(f => f.slug === slug);
    if (!file) return;

    this.activeFile = file;
    this.loading = true;
    this.error = null;

    try {
      const response = await apiClient.getFileBySlug(slug);
      this.renderedContent = renderMarkdown(response.content);
      
      // Scroll active item into view
      if (scrollTo) {
        this.$nextTick(() => {
          const sidebar = document.querySelector('aside');
          const activeItem = sidebar?.querySelector(`[data-slug="${slug}"]`);
          if (activeItem) {
            activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        });
      }
    } catch (err) {
      this.error = err.message || 'Failed to load file content';
      console.error('Error loading file:', err);
    } finally {
      this.loading = false;
    }
  },

  navigatePrev() {
    if (!this.activeFile || this.files.length === 0) return;
    const currentIndex = this.activeFile.index;
    const prevIndex = (currentIndex - 1 + this.files.length) % this.files.length;
    this.selectFile(this.files[prevIndex].slug);
  },

  navigateNext() {
    if (!this.activeFile || this.files.length === 0) return;
    const currentIndex = this.activeFile.index;
    const nextIndex = (currentIndex + 1) % this.files.length;
    this.selectFile(this.files[nextIndex].slug);
  }
}));

Alpine.start();

