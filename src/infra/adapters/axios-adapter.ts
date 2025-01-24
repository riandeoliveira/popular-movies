import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import type { ApiResponse, IHttpClient, ProblemDetails } from "../http-client";

export class AxiosAdapter implements IHttpClient {
  public async get<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
    try {
      const response: AxiosResponse<TResponse> = await axios.get(url);

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      return {
        error: axiosError.response?.data as ProblemDetails,
        status: axiosError.status as number,
      };
    }
  }

  public async post<TRequest, TResponse>(
    url: string,
    request: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Method not implemented.");
  }

  public async put<TRequest, TResponse>(
    url: string,
    request: TRequest,
  ): Promise<ApiResponse<TResponse>> {
    throw new Error("Method not implemented.");
  }

  public async delete<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
    throw new Error("Method not implemented.");
  }
}
