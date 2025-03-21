<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import { useMovie } from "@/composables/use-movie";
import { useMovieStore } from "@/stores/use-movie-store";
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";

const { filteredMovies, handlePreviousMoviesPage, handleNextMoviesPage } =
  useMovie();
const { t } = useLocale();
const movieStore = useMovieStore();

const canDisableNextPageButton = computed(
  () => movieStore.totalPages <= 1 || movieStore.page >= movieStore.totalPages,
);

const canDisablePreviousPageButton = computed(() => movieStore.page <= 1);
</script>

<template>
  <div class="flex flex-col items-center text-white gap-2" v-if="!movieStore.isDisplayingFavoriteMovies">
    <span>
      {{ t("items_per_page") }}
      {{ filteredMovies.length }}
    </span>
    <div class="flex items-center gap-4">
      <button
        type="button"
        :aria-label="t('previous_page')"
        :disabled="canDisablePreviousPageButton"
        @click="handlePreviousMoviesPage"
        class="cursor-pointer flex items-center justify-center w-8 h-8 rounded border border-transparent bg-c-blue-500 hover:enabled:bg-transparent hover:enabled:border-c-blue-500 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <BaseIcon name="previous" class="group-hover:group-enabled:text-c-blue-500" />
      </button>
      <div class="flex justify-between">
        <span>{{ t("page") }}</span>
        &nbsp;
        <span>{{ movieStore.page }} - {{ movieStore.totalPages }}</span>
        &nbsp;
        <span>{{ t("of") }} {{ movieStore.totalResults }}</span>
      </div>
      <button
        type="button"
        :aria-label="t('next_page')"
        :disabled="canDisableNextPageButton"
        @click="handleNextMoviesPage"
        class="cursor-pointer flex items-center justify-center w-8 h-8 rounded border border-transparent bg-c-blue-500 hover:enabled:bg-transparent hover:enabled:border-c-blue-500 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <BaseIcon name="next" class="group-hover:group-enabled:text-c-blue-500" />
      </button>
    </div>
  </div>
  <div class="h-16 flex flex-col items-center text-white gap-2" v-else>
    <span>
      {{ t("displaying") }}
      {{ filteredMovies.length }}
      {{ t("of") }}
      {{ movieStore.favoriteMovies.length }}
      {{ t("movies") }}
    </span>
  </div>
</template>
