import type { ApiResponse, IHttpClient } from "../http-client";

export class FetchAdapter implements IHttpClient {
  public async get<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
    const response: Response = await fetch(url);
    const data: TResponse = await response.json();

    return {
      data,
      status: response.status,
    };
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
