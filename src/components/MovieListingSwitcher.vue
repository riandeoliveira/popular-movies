<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import { useMovie } from "@/composables/use-movie";
import { useMovieStore } from "@/stores/use-movie-store";
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";

const { handleChangeFilter } = useMovie();
const { t } = useLocale();
const movieStore = useMovieStore();

const checkboxAriaLabel = computed(() =>
  movieStore.isDisplayingFavoriteMovies
    ? t("show_all_movies")
    : t("show_my_favorite_movies_only"),
);
</script>

<template>
  <div class="flex gap-[11px] items-center justify-center px-4 my-8">
    <div
      tabindex="0"
      role="checkbox"
      :aria-label="checkboxAriaLabel"
      :aria-checked="movieStore.isDisplayingFavoriteMovies"
      @click="handleChangeFilter"
      @keydown.enter="handleChangeFilter"
      @keydown.space.prevent="handleChangeFilter"
      class="w-4 h-4 border-2 rounded-sm border-c-blue-500 cursor-pointer flex items-center justify-center"
      :class="movieStore.isDisplayingFavoriteMovies ? 'bg-c-blue-500' : ''"
    >
      <BaseIcon name="check" v-if="movieStore.isDisplayingFavoriteMovies" />
    </div>
    <span
      tabindex="0"
      @click="handleChangeFilter"
      @keydown.enter="handleChangeFilter"
      @keydown.space.prevent="handleChangeFilter"
      class="text-lg text-white font-semibold select-none cursor-pointer max-s-720:text-base"
    >
      {{ t("show_my_favorite_movies_only") }}
    </span>
  </div>
</template>
