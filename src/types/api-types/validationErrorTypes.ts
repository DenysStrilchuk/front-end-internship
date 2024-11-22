export interface IValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface IValidationErrorResponse {
  detail: IValidationErrorDetail[];
}
