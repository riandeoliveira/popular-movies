export interface FindManyMoviesResponse {
  page: number;
  results: {
    id: number;
    title: string;
    overview: string;
    releaseDate: string;
    voteAverage: number;
    voteCount: number;
    backdropPath: string;
  }[];
  totalPages: number;
  totalResults: number;
}
