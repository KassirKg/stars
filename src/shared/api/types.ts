export class ApiError extends Error {
  override readonly name = 'ApiError';

  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown,
  ) {
    super(message);
  }
}
