import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type SupportedLocale = 'en' | 'hi';

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

    const { pathname, search, hash } = window.location;
    let newPathname = pathname || '/';

    if (locale === 'hi') {
      if (!newPathname.startsWith('/hi')) {
        newPathname = this.prependLocalePrefix(newPathname, 'hi');
      }
    } else {
      newPathname = this.removeLocalePrefix(newPathname, 'hi');
    }

    const finalPath = `${newPathname}${search ?? ''}${hash ?? ''}` || '/';
    window.location.href = finalPath;
  }

  private detectLocale(): SupportedLocale {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname ?? '';
      if (path === '/hi' || path.startsWith('/hi/')) {
        return 'hi';
      }
    }

    const localeAttr = this.documentRef?.documentElement?.lang ?? '';
    const normalized = localeAttr.toLowerCase();
    if (normalized.startsWith('hi')) {
      return 'hi';
    }

    return 'en';
  }

  private prependLocalePrefix(pathname: string, locale: SupportedLocale): string {
    const sanitised = pathname.startsWith('/') ? pathname : `/${pathname}`;
    if (sanitised === '/' || sanitised === '') {
      return `/${locale}/`;
    }
    return `/${locale}${sanitised}`;
  }

  private removeLocalePrefix(pathname: string, locale: SupportedLocale): string {
    const localePrefix = `/${locale}`;
    if (pathname === localePrefix) {
      return '/';
    }
    if (pathname.startsWith(`${localePrefix}/`)) {
      const next = pathname.slice(localePrefix.length);
      return next.startsWith('/') ? next : `/${next}`;
    }
    return pathname || '/';
  }
}

