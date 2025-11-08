import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, switchMap, tap, map } from 'rxjs';
import { VerseDetail } from '../../models/gita.models';
import { GitaDataService } from '../../services/gita-data.service';

type VerseViewModel =
  | {
      chapterId: string;
      chapterTitle: string;
      verse: VerseDetail;
    }
  | undefined;

@Component({
  selector: 'app-verse',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './verse.component.html',
  styleUrl: './verse.component.scss',
})
export class VerseComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(GitaDataService);

  private readonly loopSignal = signal(false);

  readonly loopEnabled = computed(() => this.loopSignal());

  readonly viewModel$: Observable<VerseViewModel> = this.route.paramMap.pipe(
    switchMap((params) => {
      const chapterId = params.get('chapterId');
      const verseId = params.get('verseId');
      if (!chapterId || !verseId) {
        return of(undefined);
      }

      return this.dataService.getVerse(chapterId, verseId).pipe(
        tap(() => this.loopSignal.set(false)),
        map((result) =>
          result
            ? {
                chapterId,
                chapterTitle: result.chapter.chapterTitleForChapterPage,
                verse: result.verse,
              }
            : undefined
        )
      );
    })
  );

  toggleLoop(): void {
    this.loopSignal.update((current) => !current);
  }

  audioSource(verse: VerseDetail): string {
    return verse.shlokPath.startsWith('assets/')
      ? verse.shlokPath
      : `assets/${verse.shlokPath.replace(/^\/+/, '')}`;
  }
}

