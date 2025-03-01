import { API_KEY, API_URL } from "@/constants";
import { type Movie, useMovieStore } from "@/stores/use-movie-store";
import _ from "lodash";
import { type ComputedRef, computed } from "vue";
import { useToast } from "vue-toastification";
import { useLocale } from "./use-locale";

type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type UseMovie = {
  filteredMovies: ComputedRef<Movie[]>;
  handleSearchMovies: _.DebouncedFunc<() => Promise<void>>;
  handleChangeFilter: () => void;
  handleFavoriteMovie: (movie: Movie) => void;
  handleNextMoviesPage: () => Promise<void>;
  handlePreviousMoviesPage: () => Promise<void>;
  updateFavoriteMovies: () => Promise<void>;
};

export const useMovie = (): UseMovie => {
  const { locale } = useLocale();
  const movieStore = useMovieStore();
  const toast = useToast();

  const filteredMovies = computed(() => getFilteredMovies());

  const addMovieToFavorites = (movie: Movie): void => {
    movieStore.favoriteMovies.push({ ...movie, favorite: true });
  };

  const convertMovie = (
    movie: Omit<Movie, "favorite">,
  ): Omit<Movie, "favorite"> => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    backdrop_path: movie.backdrop_path,
  });

  const deleteMovieFromFavorites = (movie: Movie): void => {
    movieStore.favoriteMovies = movieStore.favoriteMovies.filter(
      (item) => item.id !== movie.id,
    );
  };

  const fetchMovies = async (): Promise<Response | null> => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: locale.value,
      page: movieStore.page.toString(),
      query: movieStore.movieName.trim(),
    });

    movieStore.isLoading = true;

    const errorMessage = "Erro: Não foi possível buscar a listagem de filmes!";

    try {
      const response = await fetch(
        `${API_URL}/search/movie?${params.toString()}`,
      );

      if (!response.ok) {
        toast.error(errorMessage);

        return null;
      }

      const data: Response = await response.json();

      return data;
    } catch (error: unknown) {
      toast.error(errorMessage);
    } finally {
      movieStore.isLoading = false;
    }

    return null;
  };

  const getFilteredMovies = (): Movie[] => {
    if (movieStore.filterType === "favoriteMovies") {
      const filteredMovies = movieStore.favoriteMovies.filter((item) =>
        item.title.toLowerCase().includes(movieStore.movieName.toLowerCase()),
      );

      return _.reverse(filteredMovies);
    }

    return _.orderBy(movieStore.movies, (a) => a.vote_count, "desc");
  };

  const handleChangeFilter = (): void => {
    movieStore.filterType =
      movieStore.filterType === "movies" ? "favoriteMovies" : "movies";
  };

  const handleFavoriteMovie = (movie: Movie): void => {
    movieStore.movies = movieStore.movies.map((item) => {
      if (item.id === movie.id) {
        item.favorite = !item.favorite;
      }

      return item;
    });

    const hasMovie = movieStore.favoriteMovies.find(
      (item) => item.id === movie.id,
    );

    if (hasMovie) deleteMovieFromFavorites(movie);
    else addMovieToFavorites(movie);
  };

  const handleSearchMovies = _.debounce(async () => {
    if (movieStore.filterType === "favoriteMovies") return;

    movieStore.movies = [];

    const data = await fetchMovies();

    if (!data) return;

    if (data.results.length === 0 && data.total_results >= 1) {
      movieStore.page = 1;

      await handleSearchMovies();
    }

    movieStore.isLoading = false;

    movieStore.page = data.results.length > 0 ? data.page : 1;
    movieStore.totalPages = data.total_pages;
    movieStore.totalResults = data.total_results;

    movieStore.movies = data.results.map((movie) => {
      const convertedMovie = convertMovie(movie);

      return {
        ...convertedMovie,
        favorite: !!movieStore.favoriteMovies.find(
          (favoriteMovie) => favoriteMovie.id === movie.id,
        ),
      };
    });

    if (movieStore.isFirstRequest) movieStore.isFirstRequest = false;
  }, 500);

  const handleNextMoviesPage = async (): Promise<void> => {
    movieStore.page++;

    await handleSearchMovies();
  };

  const handlePreviousMoviesPage = async (): Promise<void> => {
    movieStore.page--;

    await handleSearchMovies();
  };

  const updateFavoriteMovies = async (): Promise<void> => {
    if (movieStore.favoriteMovies.length === 0) return;

    movieStore.movieName = "";

    const movieRequests = movieStore.favoriteMovies.map(async (movie) => {
      const params = new URLSearchParams({
        api_key: API_KEY,
        language: locale.value,
        query: movie.title,
      });

      const response = await fetch(
        `${API_URL}/search/movie?${params.toString()}`,
      );

      if (!response.ok) return movie;

      const data: Response = await response.json();

      const foundMovie =
        data.results.find((item) => item.id === movie.id) || null;

      if (!foundMovie) return movie;

      const convertedMovie = convertMovie(foundMovie);

      const updatedMovie = {
        ...convertedMovie,
        favorite: movie.favorite,
      };

      return updatedMovie;
    });

    const updatedMovies = await Promise.all(movieRequests);

    movieStore.favoriteMovies = updatedMovies;
  };

  return {
    filteredMovies,
    handleChangeFilter,
    handleFavoriteMovie,
    handleNextMoviesPage,
    handlePreviousMoviesPage,
    handleSearchMovies,
    updateFavoriteMovies,
  };
};
