<script setup lang="ts">
import LocaleSwitcher from "../components/LocaleSwitcher.vue";
import MovieCard from "../components/MovieCard.vue";
import CheckIcon from "../components/icons/CheckIcon.vue";
import NextIcon from "../components/icons/NextIcon.vue";
import PreviousIcon from "../components/icons/PreviousIcon.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import { useLocale } from "../composables/use-locale";
import { useMovieStore } from "../stores/use-movie-store";

const { t } = useLocale();
const movieStore = useMovieStore();
</script>

<template>
  <div class="bg-c-blue-900 min-h-screen font-kumbh-sans">
    <LocaleSwitcher />
    <header class="pt-15.5 pb-12 max-s-720:pt-12 max-s-720:pb-8">
      <h1
        class="text-4xl font-semibold text-center text-white max-s-720:text-3xl"
      >
        {{ t("popular-movies") }}
      </h1>
    </header>

    <div class="flex justify-center px-4">
      <div
        class="bg-c-gray-600 w-[634px] h-[74px] rounded-lg flex justify-between px-6 gap-6 max-s-720:h-[56px]"
      >
        <input
          type="text"
          name="movie-search"
          autofocus
          :placeholder="t('type-a-movie-to-search')"
          maxlength="128"
          v-model="movieStore.movieName"
          @input="movieStore.handleSearchMovies"
          class="bg-c-gray-600 w-full outline-none text-white font-medium text-lg max-s-720:text-base"
        />

        <div class="flex items-center">
          <SearchIcon />
        </div>
      </div>
    </div>

    <div class="flex gap-[11px] items-center justify-center px-4 my-8">
      <div
        tabindex="0"
        role="checkbox"
        :aria-label="
          movieStore.filterType === 'favoriteMovies'
            ? t('show-all-movies')
            : t('show-my-favorite-movies-only')
        "
        :aria-checked="movieStore.filterType === 'favoriteMovies'"
        @click="movieStore.handleChangeFilter"
        @keydown.enter="movieStore.handleChangeFilter"
        @keydown.space.prevent="movieStore.handleChangeFilter"
        class="w-4 h-4 border-2 rounded-sm border-c-blue-500 cursor-pointer flex items-center justify-center"
        :class="
          movieStore.filterType === 'favoriteMovies' ? 'bg-c-blue-500' : ''
        "
      >
        <CheckIcon v-if="movieStore.filterType === 'favoriteMovies'" />
      </div>

      <span
        tabindex="0"
        @click="movieStore.handleChangeFilter"
        @keydown.enter="movieStore.handleChangeFilter"
        @keydown.space.prevent="movieStore.handleChangeFilter"
        class="text-lg text-white font-semibold select-none cursor-pointer max-s-720:text-base"
      >
        {{ t("show-my-favorite-movies-only") }}
      </span>
    </div>

    <div
      class="flex flex-col items-center text-white gap-2"
      v-if="movieStore.filterType === 'movies'"
    >
      <span>
        {{ t("items-per-page") }}
        {{ movieStore.getFilteredMovies().length }}
      </span>
      <div class="flex items-center gap-4">
        <button
          type="button"
          :aria-label="t('previous-page')"
          :disabled="movieStore.page <= 1"
          @click="movieStore.handlePreviousMoviesPage"
          class="cursor-pointer flex items-center justify-center w-8 h-8 rounded border border-transparent bg-c-blue-500 hover:enabled:bg-transparent hover:enabled:border-c-blue-500 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PreviousIcon class="group-hover:group-enabled:text-c-blue-500" />
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
          :aria-label="t('next-page')"
          :disabled="
            movieStore.totalPages <= 1 ||
            movieStore.page >= movieStore.totalPages
          "
          @click="movieStore.handleNextMoviesPage"
          class="cursor-pointer flex items-center justify-center w-8 h-8 rounded border border-transparent bg-c-blue-500 hover:enabled:bg-transparent hover:enabled:border-c-blue-500 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <NextIcon class="group-hover:group-enabled:text-c-blue-500" />
        </button>
      </div>
    </div>
    <div class="h-16" v-else />

    <div class="flex justify-center pt-16 pb-16 max-s-720:pt-8 max-s-720:pb-8">
      <div class="flex flex-col w-[1280px] gap-12 px-4">
        <div
          class="bg-c-gray-600 rounded-lg h-[216px] animate-pulse"
          v-if="movieStore.isLoading"
          v-for="index in 10"
          :key="index"
        />

        <span
          class="text-white text-center"
          v-if="
            (movieStore.filterType === 'movies' &&
              movieStore.totalResults === 0 &&
              !movieStore.isFirstRequest) ||
            (movieStore.filterType === 'favoriteMovies' &&
              movieStore.getFilteredMovies().length === 0)
          "
        >
          {{ t("no-movies-found") }}
        </span>

        <template v-else v-for="movie in movieStore.getFilteredMovies()">
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
  </div>
</template>
