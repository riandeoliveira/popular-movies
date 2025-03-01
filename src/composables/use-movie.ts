import { type Movie, useMovieStore } from "@/stores/use-movie-store";
import { type ComputedRef, computed } from "vue";

type UseMovie = {
  filteredMovies: ComputedRef<Movie[]>;
};

export const useMovie = (): UseMovie => {
  const movieStore = useMovieStore();

  const filteredMovies = computed(() => movieStore.getFilteredMovies());

  return {
    filteredMovies,
  };
};
