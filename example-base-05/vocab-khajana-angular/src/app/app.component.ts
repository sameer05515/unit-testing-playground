import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { WordService, WordEntry } from './services/word.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly wordService = inject(WordService);

  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly words = signal<WordEntry[]>([]);
  readonly filterTerm = signal('');
  readonly currentPage = signal(1);
  readonly pageSizeOptions = [10, 25, 50, 100];
  readonly pageSize = signal(this.pageSizeOptions[0]);

  readonly filteredWords: Signal<WordEntry[]> = computed(() => {
    const term = this.filterTerm().trim().toLowerCase();
    if (!term) {
      return this.words();
    }

    return this.words().filter((entry) => {
      const inTerm = entry.term.toLowerCase().includes(term);
      const inMeanings = entry.meanings.some((meaning) =>
        meaning.toLowerCase().includes(term)
      );
      return inTerm || inMeanings;
    });
  });

  readonly totalPages = computed(() => {
    const total = Math.ceil(
      this.filteredWords().length / this.pageSize()
    );
    return total > 0 ? total : 1;
  });

  readonly pagedWords = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.filteredWords().slice(start, start + size);
  });

  constructor() {
    this.wordService.loadWords().subscribe({
      next: (entries) => {
        this.words.set(entries);
        this.isLoading.set(false);
      },
      error: () => {
        this.loadError.set(
          'Unable to load the vocabulary list. Please try again later.'
        );
        this.isLoading.set(false);
      },
    });
  }

  updateFilter(term: string): void {
    this.filterTerm.set(term);
    this.currentPage.set(1);
  }

  changePageSize(size: string): void {
    const parsed = Number(size);
    if (!Number.isNaN(parsed) && parsed > 0) {
      this.pageSize.set(parsed);
      this.currentPage.set(1);
    }
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(page, 1), this.totalPages());
    this.currentPage.set(nextPage);
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
