<script setup lang="ts">
import { useLocale } from "@/composables/use-locale";
import { useMovie } from "@/composables/use-movie";
import { useMovieStore } from "@/stores/use-movie-store";
import BaseIcon from "./BaseIcon.vue";

const { handleSearchMovies } = useMovie();
const { t } = useLocale();
const movieStore = useMovieStore();
</script>

<template>
  <div class="flex justify-center px-4">
    <div class="bg-c-gray-600 w-[634px] h-[74px] rounded-lg flex justify-between px-6 gap-6 max-s-720:h-[56px]">
      <input
        type="text"
        name="movie-search"
        autofocus
        :placeholder="t('type_a_movie_to_search')"
        maxlength="128"
        v-model="movieStore.movieName"
        @input="handleSearchMovies"
        class="bg-c-gray-600 w-full outline-none text-white font-medium text-lg max-s-720:text-base"
      />
      <div class="flex items-center">
        <BaseIcon name="search" />
      </div>
    </div>
  </div>
</template>
