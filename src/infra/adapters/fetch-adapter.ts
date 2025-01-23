import type { ApiResponse, IHttpClient } from "../http-client";

// TODO: Implementar métodos

export class FetchAdapter implements IHttpClient {
  public async get<TResponse>(url: string): Promise<ApiResponse<TResponse>> {
    const request = await fetch(url);

    return await request.json();
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
