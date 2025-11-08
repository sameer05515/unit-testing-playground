export interface ChapterSummary {
  chapterTitle: string;
  id: string;
  briefDescription: string;
}

export interface ShlokLine {
  id: number | string;
  value: string;
}

export interface TranslationEntry {
  id: number | string;
  header: string;
  value: string;
}

export interface CommentaryEntry {
  id: number | string;
  value: string;
  isShlokCommentary?: boolean;
}

export interface MeaningEntry {
  id: number | string;
  sanskrit: string;
  wordMeaningDetailUrl: string;
  meaning: string;
  wordMeaningDetailRoute?: string[];
}

export interface VerseDetail {
  verseHeader: string;
  id: string;
  oneLiner: string;
  currentVerse: string;
  nextVerse?: string;
  previousVerse?: string;
  translation: TranslationEntry[];
  commentary: CommentaryEntry[];
  shlok: ShlokLine[];
  shlokEng: ShlokLine[];
  meaning: MeaningEntry[];
  currentVerseUrl?: string;
  currentVerseRoute?: string[];
  nextVerseUrl?: string;
  nextVerseRoute?: string[];
  previousVerseUrl?: string;
  previousVerseRoute?: string[];
  shlokPath: string;
}

export interface ChapterDetail {
  chapterTitle: string;
  id: string;
  briefDescription: string;
  chapterTitleForChapterPage: string;
  chapterSubTitleForChapterPage: string;
  description: string[];
  previousChapterUrl?: string;
  nextChapterUrl?: string;
  previousChapterRoute?: string[];
  nextChapterRoute?: string[];
  verses: VerseDetail[];
}

export interface WordMeaningOccurrence {
  word: string;
  meaning: string;
  refLink: string;
  referenceHeader: string;
  route?: string[];
}

export interface WordMeaningDetail {
  id: string;
  previousWMUrl?: string;
  nextWMUrl?: string;
  previousWMRoute?: string[];
  nextWMRoute?: string[];
  data: WordMeaningOccurrence[];
}

