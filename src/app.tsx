import { type ReactElement } from "react";
import { Language } from "./data/enums/language";
import { FetchAdapter } from "./infra/adapters/fetch-adapter";
import { TmdbHttpClient } from "./infra/services/tmdb/tmdb-http-client";

export const App = (): ReactElement => {
  const fetchMovies = async (): Promise<void> => {
    const httpClient = new FetchAdapter();

    const tmdbApi = new TmdbHttpClient({
      client: httpClient,
      key: "",
      lang: Language.EN_US,
      url: import.meta.env.VITE_TMDB_API_URL,
    });

    const movies = await tmdbApi.movies.findMany("Avengers");

    console.log(movies);
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
