import type { ITmdbApiOptions } from "../tmdb-http-client";

export interface IMoviesGateway {
  findMany(name: string): Promise<any>;
}

export class MoviesGateway implements IMoviesGateway {
  public constructor(private readonly options: ITmdbApiOptions) {}

  public async findMany(name: string): Promise<any> {
    const { url, key, lang } = this.options;

    return await this.options.client.get(
      `${url}/search/movie?api_key=${key}&language=${lang}&query=${name}`,
    );
  }
}
