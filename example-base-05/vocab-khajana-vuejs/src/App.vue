<template>
  <main class="bg-slate-100">
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-8">
      <header class="space-y-4 text-center sm:text-left">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Vocab Khajana</p>
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Master one word at a time
        </h1>
        <p class="mx-auto max-w-2xl text-sm text-slate-600 sm:mx-0">
          Browse a curated list of vocabulary words, each with concise meanings and usage examples. Quickly
          search, skim, and revisit the entries you need the most.
        </p>
        <p class="text-xs font-medium uppercase tracking-wide text-slate-500">
          Total words available:
          <span class="text-indigo-600">{{ totalCount.toLocaleString() }}</span>
        </p>
      </header>

      <section class="flex flex-1 flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="w-full space-y-2 sm:max-w-md">
            <label for="search" class="text-sm font-semibold uppercase tracking-wide text-slate-500">Search</label>
            <div class="relative">
              <input
                id="search"
                v-model.trim="searchQuery"
                type="search"
                placeholder="Search by word, meaning, or example..."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21-4.35-4.35m1.6-4.65a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 sm:flex-nowrap sm:items-center">
            <div class="space-y-2">
              <label for="pageSize" class="text-sm font-semibold uppercase tracking-wide text-slate-500"
                >Words per page</label
              >
              <select
                id="pageSize"
                v-model.number="pageSize"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
              >
                <option v-for="option in pageSizeOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>

            <div
              v-if="filteredCount"
              class="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs font-medium text-indigo-600"
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
          <div class="flex items-center gap-3 text-sm font-medium text-slate-500">
            <svg class="h-5 w-5 animate-spin text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
            </svg>
            Loading vocabulary...
          </div>
        </div>

        <div
          v-else-if="errorMessage"
          class="flex flex-1 items-center justify-center rounded-2xl border border-red-200 bg-red-50/70 px-6 py-10 text-center text-sm font-medium text-red-600"
        >
          {{ errorMessage }}
        </div>

        <div v-else class="flex flex-1 flex-col gap-6">
          <div v-if="!paginatedEntries.length" class="flex flex-1 items-center justify-center py-16 text-sm text-slate-500">
            No words match your search. Try a different keyword.
          </div>

          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <WordCard v-for="entry in paginatedEntries" :key="entry.word" :entry="entry" />
          </div>

          <footer v-if="paginationVisible" class="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-sm sm:flex-row">
            <div class="text-xs font-medium uppercase tracking-wide text-slate-500">
              Page {{ currentPage }} of {{ totalPages }} &middot; {{ filteredCount.toLocaleString() }} results
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
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
                class="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-300"
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
import { computed, onMounted, ref, watch } from 'vue';

import WordCard from '@/components/WordCard.vue';
import { loadKhajana } from '@/lib/khajana';
import type { WordEntry } from '@/types';

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

