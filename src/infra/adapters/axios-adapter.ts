import { ConversionUtil } from "@/utils/conversion-util";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import type { ApiResponse, IHttpClient } from "../http-client";

export class AxiosAdapter implements IHttpClient {
  public async get<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
    try {
      const response: AxiosResponse<TResponse> = await axios.get(url);

      return ConversionUtil.toCamelCase({
        data: response.data,
        status: response.status,
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      return ConversionUtil.toCamelCase({
        data: axiosError.response?.data as TResponse,
        status: axiosError.status as number,
      });
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
