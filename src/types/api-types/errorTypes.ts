export interface IApiError {
  response?: {
    data?: {
      message?: string;
    };
    status: number;
  };
}