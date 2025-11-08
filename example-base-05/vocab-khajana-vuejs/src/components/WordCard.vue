<template>
  <article
    class="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-lg/20"
  >
    <header class="flex items-start justify-between gap-4">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">{{ entry.word }}</h2>
      <span
        v-if="entry.type"
        class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
      >
        {{ entry.type }}
      </span>
    </header>

    <section v-if="entry.meanings.length" class="space-y-2">
      <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Meanings</h3>
      <ul class="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
        <li v-for="meaning in entry.meanings" :key="meaning">{{ meaning }}</li>
      </ul>
    </section>

    <section v-if="entry.examples.length" class="space-y-2">
      <h3 class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Examples</h3>
      <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <li v-for="example in entry.examples" :key="example">
          <blockquote class="border-l-2 border-indigo-200 pl-3 italic text-slate-700 dark:border-indigo-500/30 dark:text-slate-200">
            {{ example }}
          </blockquote>
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { WordEntry } from '@/types';

defineProps<{
  entry: WordEntry;
}>();
</script>

