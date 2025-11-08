import { Routes } from '@angular/router';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { HomeComponent } from './pages/home/home.component';
import { VerseComponent } from './pages/verse/verse.component';
import { WordMeaningComponent } from './pages/word-meaning/word-meaning.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Shrimad Bhagwat Geeta',
  },
  {
    path: 'chapter/:chapterId',
    component: ChapterComponent,
    title: (route) => {
      const chapterId = route.paramMap.get('chapterId') ?? '';
      return `Chapter ${chapterId} | Shrimad Bhagwat Geeta`;
    },
  },
  {
    path: 'chapter/:chapterId/verse/:verseId',
    component: VerseComponent,
    title: (route) => {
      const chapterId = route.paramMap.get('chapterId') ?? '';
      const verseId = route.paramMap.get('verseId') ?? '';
      return `Verse ${verseId} | Chapter ${chapterId} | Shrimad Bhagwat Geeta`;
    },
  },
  {
    path: 'word-meaning/:wordId',
    component: WordMeaningComponent,
    title: (route) => {
      const wordId = route.paramMap.get('wordId') ?? '';
      return `Word Meaning: ${wordId} | Shrimad Bhagwat Geeta`;
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
