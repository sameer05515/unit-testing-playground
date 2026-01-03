import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MarkdownFile, FilesResponse } from '../models/markdown-file.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBase = '';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<FilesResponse> {
    return this.http.get<FilesResponse>(`${this.apiBase}/api/files`).pipe(
      catchError((error) => {
        const message = error.error?.error || error.message || 'Failed to fetch files';
        return throwError(() => new Error(message));
      })
    );
  }

  getFileBySlug(slug: string): Observable<MarkdownFile> {
    const encodedSlug = encodeURIComponent(slug);
    return this.http.get<MarkdownFile>(`${this.apiBase}/api/files/${encodedSlug}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return throwError(() => new Error(`File with slug "${slug}" not found`));
        }
        const message = error.error?.error || error.message || 'Failed to fetch file';
        return throwError(() => new Error(message));
      })
    );
  }
}

