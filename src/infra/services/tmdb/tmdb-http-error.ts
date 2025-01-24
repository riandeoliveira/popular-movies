import { PROBLEM_DETAILS_URI } from "@/data/constants/problem-details";
import type { IProblemDetails, ProblemDetails } from "@/infra/http-client";

export interface TmdbHttpErrorResponse {
  statusCode: number;
  statusMessage: string;
  success: boolean;
}

export class TmdbHttpError implements IProblemDetails {
  public toProblemDetails(error: TmdbHttpErrorResponse, status: number): ProblemDetails {
    return {
      type: `${PROBLEM_DETAILS_URI}/${status}`,
      status,
      title: error.statusMessage,
    };
  }
}
