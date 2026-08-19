export type ApiErrorCode =
  | "NOT_FOUND"
  | "DUPLICATE_ID"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "STORAGE_ERROR"
  | "UNKNOWN_ERROR";

interface ApiErrorOptions {
  code: ApiErrorCode;
  status: number;
  message: string;
  details?: Record<string, unknown>;
}

export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly status: number;
  public readonly details?: Record<string, unknown>;

  constructor({
    code,
    status,
    message,
    details,
  }: ApiErrorOptions) {
    super(message);

    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}