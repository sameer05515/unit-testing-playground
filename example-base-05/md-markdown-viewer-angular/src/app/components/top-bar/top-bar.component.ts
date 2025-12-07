import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownFile } from '../../models/markdown-file.model';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  @Input() activeFile: MarkdownFile | null = null;
  @Output() refresh = new EventEmitter<void>();

  onRefresh(): void {
    this.refresh.emit();
  }
}

