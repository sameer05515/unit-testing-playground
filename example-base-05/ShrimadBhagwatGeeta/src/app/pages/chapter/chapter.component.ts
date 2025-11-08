import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ChapterDetail } from '../../models/gita.models';
import { GitaDataService } from '../../services/gita-data.service';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss',
})
export class ChapterComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(GitaDataService);

  readonly chapter$: Observable<ChapterDetail | undefined> = this.route.paramMap.pipe(
    switchMap((params) => {
      const chapterId = params.get('chapterId');
      if (!chapterId) {
        return of(undefined);
      }
      return this.dataService.getChapterById(chapterId);
    })
  );
}

