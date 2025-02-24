import _, { debounce } from "lodash";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useToast } from "vue-toastification";
import { useLocalStorage } from "../composables/use-local-storage";
import { useLocale } from "../composables/use-locale";

export type Movie = {
  id: number;
  title: string;
  overview?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  backdrop_path?: string | null;
  favorite: boolean;
};

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const useMovieStore = defineStore("movie", () => {
  const toast = useToast();
  const { locale } = useLocale();
  const { favoriteMovies } = useLocalStorage();

  const page = ref(1);
  const totalPages = ref(1);
  const totalResults = ref(0);
  const movieName = ref("");
  const movies = ref<Movie[]>([]);
  const isLoading = ref(false);
  const isFirstRequest = ref(true);
  const filterType = ref<"movies" | "favoriteMovies">("movies");

  const deleteMovieFromFavorites = (movie: Movie) => {
    favoriteMovies.value = favoriteMovies.value.filter(
      (item) => item.id !== movie.id
    );
  };

  const addMovieToFavorites = (movie: Movie) => {
    favoriteMovies.value = [
      ...favoriteMovies.value,
      { ...movie, favorite: true },
    ];
  };

  const handleFavoriteMovie = (movie: Movie) => {
    movies.value = movies.value.map((item) => {
      if (item.id === movie.id) {
        item.favorite = !item.favorite;
      }

      return item;
    });

    const hasMovie = favoriteMovies.value.find((item) => item.id === movie.id);

    if (hasMovie) deleteMovieFromFavorites(movie);
    else addMovieToFavorites(movie);
  };

  const getFilteredMovies = (): Movie[] => {
    if (filterType.value === "favoriteMovies") {
      const filteredMovies = favoriteMovies.value.filter((item) =>
        item.title.toLowerCase().includes(movieName.value.toLowerCase())
      );

      return _.reverse(filteredMovies);
    }

    return _.orderBy(movies.value, (a) => a.vote_count, "desc");
  };

  const handleSearchMovies = debounce(async () => {
    if (filterType.value === "favoriteMovies") {
      return;
    }

    movies.value = [];

    const apiUrl = import.meta.env.VITE_THE_MOVIE_DATABASE_API_URL;
    const apiKey = import.meta.env.VITE_THE_MOVIE_DATABASE_API_KEY;

    const params = new URLSearchParams({
      api_key: apiKey,
      language: locale.value,
      page: page.value.toString(),
      query: movieName.value.trim(),
    });

    isLoading.value = true;

    const response = await fetch(`${apiUrl}/search/movie?${params.toString()}`);
    const data: Response = await response.json();

    if (!response.ok) {
      toast.error("Erro: Não foi possível buscar a listagem de filmes!");

      isLoading.value = false;

      return;
    }

    if (data.results.length === 0 && data.total_results >= 1) {
      page.value = 1;

      await handleSearchMovies();
    }

    isLoading.value = false;

    page.value = data.results.length > 0 ? data.page : 1;
    totalPages.value = data.total_pages;
    totalResults.value = data.total_results;

    movies.value = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        backdrop_path: movie.backdrop_path,
        favorite: !!favoriteMovies.value.find(
          (favoriteMovie) => favoriteMovie.id === movie.id
        ),
      };
    });

    if (isFirstRequest.value) isFirstRequest.value = false;
  }, 500);

  const handleChangeFilter = () => {
    filterType.value =
      filterType.value === "movies" ? "favoriteMovies" : "movies";
  };

  const handlePreviousMoviesPage = async () => {
    page.value--;

    await handleSearchMovies();
  };

  const handleNextMoviesPage = async () => {
    page.value++;

    await handleSearchMovies();
  };

  watch(locale, async () => {
    if (favoriteMovies.value.length === 0) return;

    movieName.value = "";

    const apiUrl = import.meta.env.VITE_THE_MOVIE_DATABASE_API_URL;
    const apiKey = import.meta.env.VITE_THE_MOVIE_DATABASE_API_KEY;

    const updatedMovies = await Promise.all(
      favoriteMovies.value.map(async (movie) => {
        const params = new URLSearchParams({
          api_key: apiKey,
          language: locale.value,
          query: movie.title,
        });

        const response = await fetch(
          `${apiUrl}/search/movie?${params.toString()}`
        );

        if (!response.ok) return movie;

        const data: Response = await response.json();

        const foundMovie =
          data.results.find((item) => item.id === movie.id) || null;

        if (!foundMovie) return movie;

        const updatedMovie = {
          id: foundMovie.id,
          title: foundMovie.title,
          overview: foundMovie.overview,
          release_date: foundMovie.release_date,
          vote_average: foundMovie.vote_average,
          vote_count: foundMovie.vote_count,
          backdrop_path: foundMovie.backdrop_path,
          favorite: movie.favorite,
        };

        return updatedMovie;
      })
    );

    favoriteMovies.value = updatedMovies;
  });

  return {
    favoriteMovies,
    movieName,
    handleSearchMovies,
    isFirstRequest,
    handlePreviousMoviesPage,
    page,
    totalPages,
    getFilteredMovies,
    filterType,
    handleNextMoviesPage,
    isLoading,
    handleChangeFilter,
    handleFavoriteMovie,
    movies,
    totalResults,
  };
});
