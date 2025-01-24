import type { ApiResponse } from "@/infra/http-client";
import type { TmdbApiOptions } from "../tmdb-http-client";
import type { FindManyMoviesResponse } from "./movies-responses";

export interface IMoviesGateway {
  findMany(name: string): Promise<ApiResponse<FindManyMoviesResponse>>;
}

export class MoviesGateway implements IMoviesGateway {
  public constructor(private readonly options: TmdbApiOptions) {}

  public async findMany(name: string): Promise<ApiResponse<FindManyMoviesResponse>> {
    const { url, key, lang } = this.options;

    const response = await this.options.client.get<FindManyMoviesResponse>(
      `${url}/search/movie?api_key=${key}&language=${lang}&query=${name}`,
    );

    return await this.toResult(response);
  }
}
