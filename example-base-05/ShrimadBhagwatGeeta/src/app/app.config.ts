import {
  ApplicationConfig,
  InjectionToken,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const IS_LANGUAGE_SWITCH_ENABLED = new InjectionToken<boolean>('IS_LANGUAGE_SWITCH_ENABLED');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    { provide: IS_LANGUAGE_SWITCH_ENABLED, useValue: false },
  ],
};
