import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type SupportedLocale = 'en' | 'hi';
export const LANGUAGE_STORAGE_KEY = 'smbg-lang';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly documentRef = inject(DOCUMENT);
  private readonly localeSignal = signal<SupportedLocale>(this.detectLocale());

  readonly locale = this.localeSignal.asReadonly();

  switchLocale(locale: SupportedLocale): void {
    if (this.localeSignal() === locale) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    this.persistLocale(locale);
    this.localeSignal.set(locale);
    if (this.documentRef?.documentElement) {
      this.documentRef.documentElement.lang = locale;
    }

    window.location.reload();
  }

  private detectLocale(): SupportedLocale {
    const stored = this.getStoredLocale();
    if (stored) {
      return stored;
    }

    const localeAttr = this.documentRef?.documentElement?.lang ?? '';
    const normalized = localeAttr.toLowerCase();
    if (normalized.startsWith('hi')) {
      return 'hi';
    }

    return 'en';
  }

  private persistLocale(locale: SupportedLocale): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
    } catch {
      // Storage may be unavailable; ignore.
    }
  }

  private getStoredLocale(): SupportedLocale | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }
    try {
      const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return value === 'hi' ? 'hi' : value === 'en' ? 'en' : null;
    } catch {
      return null;
    }
  }
}

