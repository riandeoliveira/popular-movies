import type { Language } from "@/data/enums/language";
import type { IHttpClient } from "@/infra/http-client";
import { MoviesGateway } from "./movies/movies-gateway";
import type { TmdbHttpError } from "./tmdb-http-error";

export interface TmdbApiOptions {
  readonly client: IHttpClient;
  readonly httpError?: TmdbHttpError;
  readonly key: string;
  readonly lang: Language;
  readonly toCamelCase: boolean;
  readonly url: string;
}

export class TmdbHttpClient {
  public constructor(private readonly options: TmdbApiOptions) {}

  public readonly movies = new MoviesGateway(this.options);
}
