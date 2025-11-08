import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'smbg-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly documentRef = inject(DOCUMENT);
  private readonly themeSignal = signal<ThemeMode>('light');

  constructor() {
    const initial = this.getInitialTheme();
    this.applyTheme(initial);

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (event: MediaQueryListEvent) => {
        if (!this.hasStoredPreference()) {
          this.applyTheme(event.matches ? 'dark' : 'light');
        }
      };
      try {
        mediaQuery.addEventListener('change', listener);
      } catch {
        // Older browsers: ignore preference change listener
      }
    }
  }

  readonly theme = this.themeSignal.asReadonly();

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme, true);
  }

  private applyTheme(theme: ThemeMode, persist = false): void {
    this.themeSignal.set(theme);
    const target = this.documentRef?.body;
    if (target) {
      target.setAttribute('data-bs-theme', theme);
    }

    if (persist && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage may be unavailable (e.g., private mode); ignore.
      }
    }
  }

  private getInitialTheme(): ThemeMode {
    const stored = this.getStoredTheme();
    if (stored) {
      return stored;
    }

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return 'light';
  }

  private getStoredTheme(): ThemeMode | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const value = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private hasStoredPreference(): boolean {
    return this.getStoredTheme() !== null;
  }
}

