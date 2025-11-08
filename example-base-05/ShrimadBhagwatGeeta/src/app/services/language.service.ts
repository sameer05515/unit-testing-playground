import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type SupportedLocale = 'en' | 'hi';

const LOCALE_REDIRECTS: Record<SupportedLocale, string> = {
  en: '/',
  hi: '/hi/',
};

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

    const target = LOCALE_REDIRECTS[locale];
    if (typeof window !== 'undefined') {
      window.location.href = target;
    }
  }

  private detectLocale(): SupportedLocale {
    const localeAttr = this.documentRef?.documentElement?.lang ?? '';
    const normalized = localeAttr.toLowerCase();

    if (normalized.startsWith('hi')) {
      return 'hi';
    }

    return 'en';
  }
}

