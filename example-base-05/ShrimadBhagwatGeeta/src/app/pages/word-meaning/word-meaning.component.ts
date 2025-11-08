import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { WordMeaningDetail } from '../../models/gita.models';
import { GitaDataService } from '../../services/gita-data.service';

@Component({
  selector: 'app-word-meaning',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './word-meaning.component.html',
  styleUrl: './word-meaning.component.scss',
})
export class WordMeaningComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(GitaDataService);

  readonly detail$: Observable<WordMeaningDetail | undefined> =
    this.route.paramMap.pipe(
      switchMap((params) => {
        const wordId = params.get('wordId');
        if (!wordId) {
          return of(undefined);
        }
        return this.dataService.getWordMeaning(wordId);
      })
    );
}

