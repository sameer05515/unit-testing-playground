import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from '../../services/markdown.service';

@Component({
  selector: 'app-markdown-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markdown-viewer.component.html',
  styleUrls: ['./markdown-viewer.component.css']
})
export class MarkdownViewerComponent implements OnInit, OnChanges {
  @Input() content: string = '';
  renderedContent: SafeHtml = '';

  constructor(
    private markdownService: MarkdownService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.content) {
      this.renderContent();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content'] && this.content) {
      this.renderContent();
    }
  }

  private async renderContent(): Promise<void> {
    try {
      const html = await this.markdownService.render(this.content);
      // Use bypassSecurityTrustHtml for markdown content
      this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Error rendering markdown:', error);
      this.renderedContent = this.sanitizer.bypassSecurityTrustHtml('<p class="text-danger">Error rendering markdown content</p>');
    }
  }
}

