<template>
  <main class="bg-slate-100 transition-colors duration-200 dark:bg-slate-950">
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8">
      <header class="space-y-4 text-center sm:text-left">
        <div class="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">
            Vocab Khajana
          </p>
          <button
            type="button"
            class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300 dark:focus-visible:ring-indigo-500/30"
            :aria-pressed="isDark"
            @click="toggleTheme"
          >
            <span class="sr-only">{{ themeLabel }}</span>
            <svg
              v-if="isDark"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 3.75V5.25M12 18.75V20.25M5.25 12H3.75M20.25 12H18.75M17.3033 17.3033L16.2374 16.2374M7.76264 7.76256L6.6967 6.69662M6.6967 17.3033L7.76264 16.2374M16.2374 7.76256L17.3033 6.69662M15 12A3 3 0 1 1 9 12A3 3 0 0 1 15 12Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
              />
            </svg>
            <span class="hidden sm:inline">{{ isDark ? 'Light' : 'Dark' }} mode</span>
          </button>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Master one word at a time
        </h1>
        <p class="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:mx-0">
          Browse a curated list of vocabulary words, each with concise meanings and usage examples. Quickly
          search, skim, and revisit the entries you need the most.
        </p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Total words available:
          <span class="text-indigo-600 dark:text-indigo-300">{{ totalCount.toLocaleString() }}</span>
        </p>
      </header>

      <section
        class="flex flex-1 flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition dark:bg-slate-900 dark:ring-slate-800 sm:p-8"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="w-full space-y-2 sm:max-w-md">
            <label for="search" class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
              >Search</label
            >
            <div class="relative">
              <input
                id="search"
                v-model.trim="searchQuery"
                type="search"
                placeholder="Search by word, meaning, or example..."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
              />
              <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 dark:text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21-4.35-4.35m1.6-4.65a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 sm:flex-nowrap sm:items-center">
            <div class="space-y-2">
              <label
                for="pageSize"
                class="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300"
                >Words per page</label
              >
              <select
                id="pageSize"
                v-model.number="pageSize"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
              >
                <option v-for="option in pageSizeOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div
              v-if="filteredCount"
              class="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs font-medium text-indigo-600 transition dark:border-indigo-400/40 dark:bg-indigo-600/10 dark:text-indigo-200"
            >
              Showing
              <span>{{ displayRange.start }}</span>
              –
              <span>{{ displayRange.end }}</span>
              of
              <span>{{ filteredCount }}</span>
              results
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="flex flex-1 items-center justify-center py-16">
          <div class="flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            <svg class="h-5 w-5 animate-spin text-indigo-400 dark:text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
            </svg>
            Loading vocabulary...
          </div>
        </div>

        <div
          v-else-if="errorMessage"
          class="flex flex-1 items-center justify-center rounded-2xl border border-red-200 bg-red-50/70 px-6 py-10 text-center text-sm font-medium text-red-600 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-200"
        >
          {{ errorMessage }}
        </div>

        <div v-else class="flex flex-1 flex-col gap-6">
          <div
            v-if="!paginatedEntries.length"
            class="flex flex-1 items-center justify-center py-16 text-sm text-slate-500 dark:text-slate-400"
          >
            No words match your search. Try a different keyword.
          </div>

          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <WordCard v-for="entry in paginatedEntries" :key="entry.word" :entry="entry" />
          </div>

          <footer
            v-if="paginationVisible"
            class="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-sm dark:border-slate-800 sm:flex-row"
          >
            <div class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Page {{ currentPage }} of {{ totalPages }} · {{ filteredCount.toLocaleString() }} results
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300 dark:disabled:border-slate-800 dark:disabled:text-slate-700"
                :disabled="currentPage === 1"
                @click="goToPrevious"
              >
                Previous
              </button>
              <div class="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                {{ currentPage }}
              </div>
              <button
                type="button"
                class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300 dark:disabled:border-slate-800 dark:disabled:text-slate-700"
                :disabled="currentPage === totalPages"
                @click="goToNext"
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

import WordCard from '@/components/WordCard.vue';
import { loadKhajana } from '@/lib/khajana';
import type { WordEntry } from '@/types';

const THEME_STORAGE_KEY = 'khajana-theme';
type Theme = 'light' | 'dark';

const theme = ref<Theme>('light');
const isDark = computed(() => theme.value === 'dark');
const themeLabel = computed(() => (isDark.value ? 'Switch to light mode' : 'Switch to dark mode'));
const hasExplicitPreference = ref(false);

let mediaQuery: MediaQueryList | undefined;
let mediaListener: ((event: MediaQueryListEvent) => void) | undefined;

function setColorScheme(target: HTMLElement, value: Theme) {
  target.style.colorScheme = value === 'dark' ? 'dark light' : 'light dark';
}

function applyTheme(value: Theme, persist = true) {
  const root = document.documentElement;
  const body = document.body;

  theme.value = value;
  root.classList.toggle('dark', value === 'dark');
  body.classList.toggle('dark', value === 'dark');
  setColorScheme(root, value);
  setColorScheme(body, value);

  if (persist) {
    hasExplicitPreference.value = true;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
      // Ignore storage errors (e.g., privacy mode)
    }
  }
}

function installSystemThemeListener() {
  if (typeof window.matchMedia !== 'function') {
    return;
  }

  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaListener = (event: MediaQueryListEvent) => {
    if (hasExplicitPreference.value) {
      return;
    }

    applyTheme(event.matches ? 'dark' : 'light', false);
  };

  try {
    mediaQuery.addEventListener('change', mediaListener);
  } catch {
    // Safari < 14 fallback
    mediaQuery.addListener(mediaListener);
  }

  applyTheme(mediaQuery.matches ? 'dark' : 'light', false);
}

function resolvePreferredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // Ignore storage read errors
  }

  return null;
}

function toggleTheme() {
  applyTheme(isDark.value ? 'light' : 'dark');
}

const pageSizeOptions = [20, 40, 80, 120] as const;

const entries = ref<WordEntry[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');
const searchQuery = ref<string>('');
const pageSize = ref<number>(pageSizeOptions[0]);
const currentPage = ref<number>(1);

const totalCount = computed(() => entries.value.length);

onMounted(async () => {
  try {
    entries.value = await loadKhajana();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error while loading khajana.xml';
    errorMessage.value = message;
  } finally {
    isLoading.value = false;
  }
});

onMounted(() => {
  const stored = resolvePreferredTheme();

  if (stored) {
    hasExplicitPreference.value = true;
    applyTheme(stored, false);
  } else {
    installSystemThemeListener();
  }

  if (!stored && !mediaQuery) {
    applyTheme('light', false);
  }
});

onBeforeUnmount(() => {
  if (!mediaQuery || !mediaListener) {
    return;
  }

  try {
    mediaQuery.removeEventListener('change', mediaListener);
  } catch {
    mediaQuery.removeListener(mediaListener);
  }
});

const filteredEntries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return entries.value;
  }

  return entries.value.filter((entry: WordEntry) => {
    const haystack = [
      entry.word,
      entry.type ?? '',
      ...entry.meanings,
      ...entry.examples,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
});

const filteredCount = computed(() => filteredEntries.value.length);

watch([filteredEntries, pageSize], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => {
  const count = filteredEntries.value.length;
  return count === 0 ? 0 : Math.ceil(count / pageSize.value);
});

watch(totalPages, (value) => {
  if (value === 0) {
    currentPage.value = 1;
    return;
  }

  if (currentPage.value > value) {
    currentPage.value = value;
  }
});

const paginatedEntries = computed(() => {
  if (!filteredEntries.value.length) {
    return [];
  }

  const start = (currentPage.value - 1) * pageSize.value;
  return filteredEntries.value.slice(start, start + pageSize.value);
});

const paginationVisible = computed(() => totalPages.value > 1);

const displayRange = computed(() => {
  if (!filteredEntries.value.length) {
    return { start: 0, end: 0 };
  }

  const startIndex = (currentPage.value - 1) * pageSize.value + 1;
  const endIndex = Math.min(startIndex + pageSize.value - 1, filteredEntries.value.length);

  return {
    start: startIndex,
    end: endIndex,
  };
});

function goToPrevious() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function goToNext() {
  if (totalPages.value && currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}
</script>

