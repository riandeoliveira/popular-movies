<script setup lang="ts">
import notFoundImage from "@/assets/images/not-found.png";
import { useLocale } from "@/composables/use-locale";
import { type Movie, useMovieStore } from "@/stores/use-movie-store";
import HeartIcon from "./icons/HeartIcon.vue";
import StarIcon from "./icons/StarIcon.vue";

type Props = Movie;

defineProps<Props>();

const movieStore = useMovieStore();
const { t } = useLocale();
</script>

<template>
  <div
    class="bg-c-blue-800 flex px-10 py-7 rounded-lg shadow-card justify-between gap-6 items-center max-s-1320:flex-col max-s-720:px-5 max-s-720:py-3.5"
  >
    <div class="flex gap-6 max-s-720:flex-col">
      <div class="flex max-s-720:justify-center">
        <a
          :href="`https://www.themoviedb.org/movie/${id}`"
          rel="external noreferrer"
          target="_blank"
          class="text-white transition-colors mr-16 max-s-720:mr-0"
        >
          <img
            :src="
              backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                : notFoundImage
            "
            alt="Movie image"
            width="160"
            height="160"
            class="shadow-image rounded-full h-40 object-cover hover:translate-y-1 transition-transform"
          />
        </a>
      </div>
      <div
        class="flex flex-col justify-center gap-6 w-[260px] text-lg text-white"
      >
        <a
          :href="`https://www.themoviedb.org/movie/${id}`"
          rel="external noreferrer"
          target="_blank"
          class="hover:text-zinc-400 transition-colors max-s-720:text-center"
        >
          <span>{{ title }}</span>
          <span v-if="!!!release_date">&nbsp;(????)</span>
          <span v-else>&nbsp;({{ release_date.slice(0, 4) }})</span>
        </a>
        <div class="flex justify-between">
          <div class="flex gap-3 items-center">
            <StarIcon />
            <span
              v-if="
                vote_average !== null && vote_average !== undefined
              "
            >
              {{ vote_average.toFixed(1) }}
            </span>
            <span v-else>?.?</span>
          </div>
          <div class="flex gap-3 items-center">
            <button
              type="button"
              @click="movieStore.handleFavoriteMovie($props)"
              class="cursor-pointer"
            >
              <HeartIcon :class="favorite ? 'fill-c-red-700' : ''" />
            </button>
            <label
              tabindex="0"
              @click="movieStore.handleFavoriteMovie($props)"
              @keydown.enter="movieStore.handleFavoriteMovie($props)"
              @keydown.space.prevent="movieStore.handleFavoriteMovie($props)"
              class="cursor-pointer hover:text-zinc-400 select-none"
            >
              {{ t("favorite") }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <p
      class="text-c-gray-400 font-medium leading-8 text-justify max-w-[592px] w-full"
    >
      <template v-if="overview">
        {{ overview }}
      </template>
      <template v-else>{{ t("movie-without-overview") }}</template>
    </p>
  </div>
</template>
