<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import { useMovie } from "@/composables/use-movie";
import { useMovieStore } from "@/stores/use-movie-store";
import { computed } from "vue";
import MovieCard from "./MovieCard.vue";

const { filteredMovies } = useMovie();
const { t } = useLocale();
const movieStore = useMovieStore();

const noMoviesFound = computed(
  () =>
    (!movieStore.isDisplayingFavoriteMovies &&
      movieStore.totalResults === 0 &&
      !movieStore.isFirstRequest) ||
    (movieStore.isDisplayingFavoriteMovies &&
      filteredMovies.value.length === 0),
);
</script>

<template>
  <div class="flex justify-center pt-16 pb-16 max-s-720:pt-8 max-s-720:pb-8">
    <div class="flex flex-col w-[1280px] gap-12 px-4">
      <div
        class="bg-c-gray-600 rounded-lg h-[216px] animate-pulse"
        v-if="movieStore.isLoading"
        v-for="index in 10"
        :key="index"
      />
      <span class="text-white text-center" v-if="noMoviesFound">
        {{ t("no-movies-found") }}
      </span>
      <template v-else v-for="movie in filteredMovies">
        <MovieCard
          :id="movie.id"
          :title="movie.title"
          :overview="movie.overview"
          :release_date="movie.release_date"
          :vote_average="movie.vote_average"
          :vote_count="movie.vote_count"
          :backdrop_path="movie.backdrop_path"
          :favorite="movie.favorite"
        />
      </template>
    </div>
  </div>
</template>
