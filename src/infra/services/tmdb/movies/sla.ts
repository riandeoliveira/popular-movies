import type { ApiResponse } from "@/infra/http-client";
import { ConversionUtil } from "@/utils/conversion-util";
import type { TmdbApiOptions } from "../tmdb-http-client";

export abstract class Sla {
  public async toResult<TResponse>(
    response: ApiResponse<TResponse>,
    options: TmdbApiOptions,
  ): Promise<ApiResponse<TResponse>> {
    if (options.toCamelCase) return ConversionUtil.toCamelCase(response);

    if (options.httpError && response.error) {
      return options.httpError.toProblemDetails(response.error, response.status);
    }

    return response;
  }
}
