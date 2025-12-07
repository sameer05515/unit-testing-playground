import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FileSidebarComponent } from './components/file-sidebar/file-sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { ApiService } from './services/api.service';
import { MarkdownFile } from './models/markdown-file.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FileSidebarComponent,
    TopBarComponent,
    MarkdownViewerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  files: MarkdownFile[] = [];
  activeFile: MarkdownFile | null = null;
  renderedContent: string = '';
  loading: boolean = false;
  error: string | null = null;
  sidebarOpen: boolean = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadFiles();
    
    // Check for slug in URL
    this.route.queryParams.subscribe(params => {
      const slug = params['slug'];
      if (slug && this.files.length > 0) {
        const file = this.files.find(f => f.slug === slug);
        if (file) {
          this.selectFile(file.slug);
        } else if (this.files.length > 0) {
          this.selectFile(this.files[0].slug);
        }
      } else if (this.files.length > 0) {
        this.selectFile(this.files[0].slug);
      }
    });
  }

  async loadFiles(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const response = await firstValueFrom(this.apiService.getFiles());
      this.files = response.files || [];
      if (this.files.length === 0) {
        this.error = 'No markdown files found. Please check your configuration.';
      }
    } catch (err: any) {
      this.error = err.message || 'Failed to load markdown files';
      console.error('Error loading files:', err);
      this.files = [];
    } finally {
      this.loading = false;
    }
  }

  async refreshFiles(): Promise<void> {
    await this.loadFiles();
    if (this.activeFile && this.files.length > 0) {
      const updated = this.files.find(f => f.slug === this.activeFile!.slug);
      if (updated) {
        await this.selectFile(updated.slug);
      } else if (this.files.length > 0) {
        await this.selectFile(this.files[0].slug);
      }
    } else if (this.files.length > 0) {
      await this.selectFile(this.files[0].slug);
    }
  }

  async selectFile(slug: string): Promise<void> {
    const file = this.files.find(f => f.slug === slug);
    if (!file) return;

    this.activeFile = file;
    this.loading = true;
    this.error = null;

    try {
      const fileData = await firstValueFrom(this.apiService.getFileBySlug(slug));
      if (fileData && fileData.content) {
        this.renderedContent = fileData.content;
      }
      
      // Update URL
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { slug },
        queryParamsHandling: 'merge'
      });
    } catch (err: any) {
      this.error = err.message || 'Failed to load file content';
      console.error('Error loading file:', err);
    } finally {
      this.loading = false;
    }
  }

  navigatePrev(): void {
    if (!this.activeFile || this.files.length === 0) return;
    const currentIndex = this.activeFile.index;
    const prevIndex = (currentIndex - 1 + this.files.length) % this.files.length;
    this.selectFile(this.files[prevIndex].slug);
  }

  navigateNext(): void {
    if (!this.activeFile || this.files.length === 0) return;
    const currentIndex = this.activeFile.index;
    const nextIndex = (currentIndex + 1) % this.files.length;
    this.selectFile(this.files[nextIndex].slug);
  }
}

