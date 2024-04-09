export type TypeApiResponse<TResponse, TError> = {
  status?: number;
  response?: TResponse;
  error?: TError;
};

export class HttpClient {
  static get = async <TResponse, TError = string>(
    url: string | URL | Request,
    options?: RequestInit
  ): Promise<TypeApiResponse<TResponse, TError>> => {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const jsonReponse = await response.json();
        return { status: response.status, response: jsonReponse };
      } else {
        const jsonReponse = await response.json();
        return { status: response.status, error: jsonReponse };
      }
    } catch (error) {
      console.error("Error: ", error);
      return {};
    }
  };
}
