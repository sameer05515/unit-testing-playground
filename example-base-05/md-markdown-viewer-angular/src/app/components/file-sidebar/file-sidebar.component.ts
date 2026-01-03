import { Component, Input, Output, EventEmitter, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownFile } from '../../models/markdown-file.model';

@Component({
  selector: 'app-file-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-sidebar.component.html',
  styleUrls: ['./file-sidebar.component.css']
})
export class FileSidebarComponent implements OnInit, AfterViewChecked {
  @Input() files: MarkdownFile[] = [];
  @Input() activeFile: MarkdownFile | null = null;
  @Input() sidebarOpen: boolean = true;
  @Output() fileSelected = new EventEmitter<string>();
  @Output() sidebarToggle = new EventEmitter<void>();

  filter: string = '';
  private shouldScroll: boolean = false;

  @ViewChild('sidebarList', { static: false }) sidebarList!: ElementRef;

  get filteredFiles(): MarkdownFile[] {
    if (!this.filter.trim()) {
      return this.files;
    }
    const query = this.filter.toLowerCase();
    return this.files.filter(file =>
      file.name.toLowerCase().includes(query) ||
      file.relativePath.toLowerCase().includes(query)
    );
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.activeFile) {
      this.scrollToActiveFile();
      this.shouldScroll = false;
    }
  }

  onFileClick(slug: string): void {
    this.shouldScroll = true;
    this.fileSelected.emit(slug);
  }

  private scrollToActiveFile(): void {
    if (!this.activeFile || !this.sidebarList) {
      return;
    }

    const activeItem = this.sidebarList.nativeElement.querySelector(`[data-slug="${this.activeFile.slug}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  isActive(file: MarkdownFile): boolean {
    return this.activeFile?.slug === file.slug;
  }

  trackBySlug(index: number, file: MarkdownFile): string {
    return file.slug;
  }
}
