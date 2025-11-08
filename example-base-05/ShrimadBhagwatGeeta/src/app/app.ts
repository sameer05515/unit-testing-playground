import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { IS_LANGUAGE_SWITCH_ENABLED } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly currentYear = new Date().getFullYear();
  protected readonly navOpen = signal(false);
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
  protected readonly showLanguageSwitcher =
    (inject(IS_LANGUAGE_SWITCH_ENABLED, { optional: true }) as boolean | null) ?? false;
  protected readonly theme = this.themeService.theme;
  protected readonly locale = this.languageService.locale;

  toggleNav(): void {
    this.navOpen.update((value) => !value);
  }

  closeNav(): void {
    this.navOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  switchLocale(locale: 'en' | 'hi'): void {
    this.languageService.switchLocale(locale);
  }
}
