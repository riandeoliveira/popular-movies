import type { Language } from "@/data/enums/language";
import type { IHttpClient } from "@/infra/http-client";
import { MoviesGateway } from "./movies/movies-gateway";

export interface ITmdbApiOptions {
  readonly client: IHttpClient;
  readonly key: string;
  readonly lang: Language;
  readonly url: string;
}

export class TmdbHttpClient {
  public constructor(private readonly options: ITmdbApiOptions) {}

  public readonly movies = new MoviesGateway(this.options);
}
