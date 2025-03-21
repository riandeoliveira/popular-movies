<script setup lang="ts">
import { images } from "@/assets";
import { useLocale } from "@/composables/use-locale";
import { useMovie } from "@/composables/use-movie";
import type { Movie } from "@/services/use-movie-service";
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";

type Props = Movie;

const props = defineProps<Props>();

const { handleFavoriteMovie } = useMovie();
const { t } = useLocale();

const imageSrc = computed(() =>
  props.backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${props.backdrop_path}`
    : images.notFound,
);

const handleToggleMovie = (): void => handleFavoriteMovie(props);
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
            :src="imageSrc"
            :alt="t('movie_poster')"
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
            <BaseIcon name="star" />
            <span v-if=" vote_average !== null && vote_average !== undefined">
              {{ vote_average.toFixed(1) }}
            </span>
            <span v-else>?.?</span>
          </div>
          <div class="flex gap-3 items-center">
            <button
              type="button"
              @click="handleToggleMovie"
              class="cursor-pointer"
            >
              <BaseIcon name="heart" :class="favorite ? 'fill-c-red-700' : ''" />
            </button>
            <label
              tabindex="0"
              @click="handleToggleMovie"
              @keydown.enter="handleToggleMovie"
              @keydown.space.prevent="handleToggleMovie"
              class="cursor-pointer hover:text-zinc-400 select-none"
            >
              {{ t("favorite") }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <p class="text-c-gray-400 font-medium leading-8 text-justify max-w-[592px] w-full">
      <template v-if="overview">{{ overview }}</template>
      <template v-else>{{ t("movie_without_overview") }}</template>
    </p>
  </div>
</template>
