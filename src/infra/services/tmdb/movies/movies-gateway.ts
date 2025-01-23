import type { TmdbApiResponse } from "../tmdb-api-response";
import type { TmdbApiOptions } from "../tmdb-http-client";
import type { FindManyMoviesResponse } from "./movies-responses";

export interface IMoviesGateway {
  findMany(name: string): Promise<TmdbApiResponse<FindManyMoviesResponse>>;
}

export class MoviesGateway implements IMoviesGateway {
  public constructor(private readonly options: TmdbApiOptions) {}

  public async findMany(name: string): Promise<TmdbApiResponse<FindManyMoviesResponse>> {
    const { url, key, lang } = this.options;

    return await this.options.client.get<FindManyMoviesResponse>(
      `${url}/search/movie?api_key=${key}&language=${lang}&query=${name}`,
    );
  }
}
