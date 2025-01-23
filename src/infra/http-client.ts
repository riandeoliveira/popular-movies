export interface ApiResponse<TResponse> {
  data?: TResponse;
  status: number;
}

export interface IHttpClient {
  get<TResponse>(url: string): Promise<ApiResponse<TResponse>>;

  post<TRequest, TResponse>(url: string, request: TRequest): Promise<ApiResponse<TResponse>>;

  put<TRequest, TResponse>(url: string, request: TRequest): Promise<ApiResponse<TResponse>>;

  delete<TResponse>(url: string): Promise<ApiResponse<TResponse>>;
}
