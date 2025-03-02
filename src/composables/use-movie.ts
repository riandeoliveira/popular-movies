import { type Movie, useMovieService } from "@/services/use-movie-service";
import { useMovieStore } from "@/stores/use-movie-store";
import _ from "lodash";
import { type ComputedRef, computed } from "vue";

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
  const { fetchMovies } = useMovieService();
  const movieStore = useMovieStore();

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

  const getFilteredMovies = (): Movie[] => {
    if (movieStore.isDisplayingFavoriteMovies) {
      const filteredMovies = movieStore.favoriteMovies.filter((item) =>
        item.title.toLowerCase().includes(movieStore.movieName.toLowerCase()),
      );

      return _.reverse(filteredMovies);
    }

    return _.orderBy(movieStore.movies, (a) => a.vote_count, "desc");
  };

  const handleChangeFilter = (): void => {
    movieStore.isDisplayingFavoriteMovies =
      !movieStore.isDisplayingFavoriteMovies;
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
    if (movieStore.isDisplayingFavoriteMovies) return;

    movieStore.movies = [];

    const data = await fetchMovies({
      movieName: movieStore.movieName,
    });

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
      const data = await fetchMovies({
        movieName: movie.title,
        withoutLoading: true,
      });

      if (!data) return movie;

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
