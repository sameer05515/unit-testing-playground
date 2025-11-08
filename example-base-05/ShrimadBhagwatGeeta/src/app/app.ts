import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly currentYear = new Date().getFullYear();
  protected readonly navOpen = signal(false);

  toggleNav(): void {
    this.navOpen.update((value) => !value);
  }

  closeNav(): void {
    this.navOpen.set(false);
  }
}
