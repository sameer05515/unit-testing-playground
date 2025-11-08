import { HttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, inject } from '@angular/core';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import {
  ChapterDetail,
  ChapterSummary,
  MeaningEntry,
  VerseDetail,
  WordMeaningDetail,
} from '../models/gita.models';

const SUMMARY_FILE = 'chapter-summary.json';
const CHAPTER_DETAIL_FILE = 'chapter-verse-detail-temp.json';
const WORD_MEANING_FILE = 'chapter-verse-word-meaning-temp.json';

@Injectable({
  providedIn: 'root',
})
export class GitaDataService {
  private readonly http = inject(HttpClient);
  private readonly locale = (inject(LOCALE_ID) ?? 'en').split('-')[0];

  private readonly chapterSummaries$ = this.loadJson<ChapterSummary[]>(SUMMARY_FILE).pipe(
    shareReplay({ bufferSize: 1, refCount: false })
  );

  private readonly chapterDetails$ = this.loadJson<ChapterDetail[]>(CHAPTER_DETAIL_FILE).pipe(
    map((chapters) =>
      chapters.map((chapter) => ({
        ...chapter,
        previousChapterRoute: this.hashLinkToRoute(chapter.previousChapterUrl),
        nextChapterRoute: this.hashLinkToRoute(chapter.nextChapterUrl),
        verses: chapter.verses.map((verse) => ({
          ...verse,
          currentVerseRoute: this.hashLinkToRoute(verse.currentVerseUrl),
          nextVerseRoute: this.hashLinkToRoute(verse.nextVerseUrl),
          previousVerseRoute: this.hashLinkToRoute(verse.previousVerseUrl),
          meaning: verse.meaning.map((meaningEntry) =>
            this.enhanceMeaningEntry(meaningEntry)
          ),
        })),
      }))
    ),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  private readonly wordMeanings$ = this.loadJson<WordMeaningDetail[]>(WORD_MEANING_FILE).pipe(
    map((entries) =>
      entries.map((entry) => ({
        ...entry,
        previousWMRoute: this.hashLinkToRoute(entry.previousWMUrl),
        nextWMRoute: this.hashLinkToRoute(entry.nextWMUrl),
        data: entry.data.map((item) => ({
          ...item,
          route: this.hashLinkToRoute(item.refLink),
        })),
      }))
    ),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  getChapterSummaries(): Observable<ChapterSummary[]> {
    return this.chapterSummaries$;
  }

  getChapters(): Observable<ChapterDetail[]> {
    return this.chapterDetails$;
  }

  getChapterById(chapterId: string): Observable<ChapterDetail | undefined> {
    return this.chapterDetails$.pipe(
      map((chapters) => chapters.find((chapter) => chapter.id === chapterId))
    );
  }

  getVerse(
    chapterId: string,
    verseId: string
  ): Observable<{ chapter: ChapterDetail; verse: VerseDetail } | undefined> {
    return this.chapterDetails$.pipe(
      map((chapters) => {
        const chapter = chapters.find((item) => item.id === chapterId);
        if (!chapter) {
          return undefined;
        }

        const verse = chapter.verses.find((item) => item.id === verseId);
        if (!verse) {
          return undefined;
        }

        return { chapter, verse };
      })
    );
  }

  getWordMeaning(wordId: string): Observable<WordMeaningDetail | undefined> {
    return this.wordMeanings$.pipe(
      map((entries) => entries.find((item) => item.id === wordId))
    );
  }

  private enhanceMeaningEntry(entry: MeaningEntry): MeaningEntry {
    return {
      ...entry,
      wordMeaningDetailRoute: this.hashLinkToRoute(entry.wordMeaningDetailUrl),
    };
  }

  private hashLinkToRoute(link?: string): string[] | undefined {
    if (!link) {
      return undefined;
    }

    const trimmed = link.trim();
    if (!trimmed || !trimmed.startsWith('#/')) {
      return undefined;
    }

    const path = trimmed.slice(2);
    return ['/', ...path.split('/').filter(Boolean)];
  }

  private loadJson<T>(fileName: string): Observable<T> {
    const fallbackPath = `assets/data/json/${fileName}`;
    if (this.locale === 'en') {
      return this.http.get<T>(fallbackPath);
    }

    const localizedPath = `assets/data/json/${this.locale}/${fileName}`;
    return this.http.get<T>(localizedPath).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return this.http.get<T>(fallbackPath);
        }
        return throwError(() => error);
      })
    );
  }
}

