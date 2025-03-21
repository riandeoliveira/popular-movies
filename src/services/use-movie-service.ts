import { useLocale } from "@/composables/use-locale";
import { API_KEY, API_URL } from "@/constants";
import { useMovieStore } from "@/stores/use-movie-store";
import { useToast } from "vue-toastification";

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

export type Response = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

type FetchMoviesOptions = {
  movieName: string;
  withoutLoading?: boolean;
};

type UseMovieService = {
  fetchMovies: (options: FetchMoviesOptions) => Promise<Response | null>;
};

export const useMovieService = (): UseMovieService => {
  const { locale, t } = useLocale();
  const movieStore = useMovieStore();
  const toast = useToast();

  const fetchMovies = async (
    options: FetchMoviesOptions,
  ): Promise<Response | null> => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      language: locale.value,
      page: movieStore.page.toString(),
      query: options.movieName.trim(),
    });

    if (!options?.withoutLoading) {
      movieStore.isLoading = true;
    }

    try {
      const response = await fetch(
        `${API_URL}/search/movie?${params.toString()}`,
      );

      if (!response.ok) {
        toast.error(t("fetch_movies_error"));

        return null;
      }

      const data: Response = await response.json();

      return data;
    } catch (error: unknown) {
      toast.error(t("fetch_movies_error"));
    } finally {
      if (!options?.withoutLoading) {
        movieStore.isLoading = false;
      }
    }

    return null;
  };

  return {
    fetchMovies,
  };
};
