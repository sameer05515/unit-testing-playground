import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { WordService, WordEntry } from './services/word.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly wordService = inject(WordService);

  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly words = signal<WordEntry[]>([]);
  readonly filterTerm = signal('');
  readonly currentPage = signal(1);
  readonly pageSizeOptions = [10, 25, 50, 100];
  readonly pageSize = signal(this.pageSizeOptions[0]);
  readonly themeMode = signal<'light' | 'dark'>(this.getInitialTheme());

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

  readonly isDarkMode = computed(() => this.themeMode() === 'dark');

  private readonly syncTheme = effect(() => {
    const mode = this.themeMode();
    this.document.body.setAttribute('data-bs-theme', mode);
    this.safeLocalStorageSet('theme-mode', mode);
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

  toggleTheme(): void {
    this.themeMode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  private getInitialTheme(): 'light' | 'dark' {
    const stored = this.safeLocalStorageGet('theme-mode');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return 'light';
  }

  private safeLocalStorageGet(key: string): string | null {
    try {
      return typeof window !== 'undefined'
        ? window.localStorage.getItem(key)
        : null;
    } catch {
      return null;
    }
  }

  private safeLocalStorageSet(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // ignore storage errors
    }
  }
}
