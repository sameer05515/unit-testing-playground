import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface WordEntry {
  term: string;
  type: string | null;
  meanings: string[];
  examples: string[];
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private readonly xmlPath = 'assets/khajana.xml';

  constructor(private readonly http: HttpClient) {}

  loadWords(): Observable<WordEntry[]> {
    return this.http
      .get(this.xmlPath, { responseType: 'text' })
      .pipe(map((xml) => this.parseWordList(xml)));
  }

  private parseWordList(xml: string): WordEntry[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const entries = Array.from(doc.querySelectorAll('word-list > myword'));

    return entries.map((item) => ({
      term: item.querySelector('word')?.textContent?.trim() ?? '',
      type: item.querySelector('word')?.getAttribute('type') ?? null,
      meanings: Array.from(item.querySelectorAll('meanings > meaning')).map(
        (meaning) => meaning.textContent?.trim() ?? ''
      ),
      examples: Array.from(item.querySelectorAll('examples > example')).map(
        (example) => example.textContent?.trim() ?? ''
      ),
    }));
  }
}

