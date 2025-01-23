import type { ApiResponse } from "@/infra/http-client";

export interface TmdbApiResponse<TResponse> extends ApiResponse<TResponse> {
  error?: {
    statusCode: number;
    statusMessage: string;
    success: boolean;
  };
}
