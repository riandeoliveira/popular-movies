import { type ReactElement } from "react";
import { EnvironmentVariable } from "./data/constants/environment-variable";
import { Language } from "./data/enums/language";
import { AxiosAdapter } from "./infra/adapters/axios-adapter";
import { FetchAdapter } from "./infra/adapters/fetch-adapter";
import { TmdbHttpClient } from "./infra/services/tmdb/tmdb-http-client";

export const App = (): ReactElement => {
  const fetchMovies = async (): Promise<void> => {
    const fetchAdapterHttpClient = new FetchAdapter();
    const axiosAdapterHttpClient = new AxiosAdapter();

    const tmdbApi = new TmdbHttpClient({
      client: axiosAdapterHttpClient,
      key: "",
      lang: Language.EN_US,
      url: EnvironmentVariable.VITE_TMDB_API_URL,
    });

    const movies = await tmdbApi.movies.findMany("Avengers");

    if (movies.data) {
      console.log(movies.data);
    }

    if (movies.error) {
      console.log(movies.error);
    }
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <button
        type="button"
        onClick={fetchMovies}
        className="bg-blue-500 rounded-xl text-white px-4 py-2 m-12 hover:bg-blue-600 transition-colors"
      >
        Pesquisar filmes
      </button>
    </div>
  );
};
