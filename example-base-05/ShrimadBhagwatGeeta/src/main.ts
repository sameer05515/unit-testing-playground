/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { loadTranslations } from '@angular/localize';
import { ɵsetLocaleId as setLocaleId } from '@angular/core';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { LANGUAGE_STORAGE_KEY } from './app/services/language.service';

type SupportedLocale = 'en' | 'hi';

async function configureLocale(): Promise<SupportedLocale> {
  const locale = getPreferredLocale();
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }

  if (locale === 'hi') {
    const [translationsModule] = await Promise.all([
      import('./locales/messages.hi.json'),
      import('@angular/common/locales/global/hi'),
    ]);
    const translations = (translationsModule as any).default ?? translationsModule;
    if (translations?.translations) {
      loadTranslations(translations.translations);
    }
    setLocaleId('hi');
  } else {
    setLocaleId('en');
  }

  return locale;
}

function getPreferredLocale(): SupportedLocale {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'hi' || stored === 'en') {
        return stored;
      }
    } catch {
      // Storage may be unavailable; ignore.
    }
  }

  if (typeof document !== 'undefined') {
    const langAttr = document.documentElement.lang?.toLowerCase() ?? '';
    if (langAttr.startsWith('hi')) {
      return 'hi';
    }
  }

  return 'en';
}

configureLocale()
  .then(() => bootstrapApplication(App, appConfig))
  .catch((err) => console.error(err));
