import { useLocalStorage } from "@/composables/use-local-storage";
import type { Movie } from "@/services/use-movie-service";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movie", () => {
  const { favoriteMovies } = useLocalStorage();

  const isDisplayingFavoriteMovies = ref(false);
  const isFirstRequest = ref(true);
  const isLoading = ref(false);
  const movieName = ref("");
  const movies = ref<Movie[]>([]);
  const page = ref(1);
  const totalPages = ref(1);
  const totalResults = ref(0);

  return {
    favoriteMovies,
    isDisplayingFavoriteMovies,
    isFirstRequest,
    isLoading,
    movieName,
    movies,
    page,
    totalPages,
    totalResults,
  };
});
