export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode = 500, code = "INTERNAL_ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      error: true,
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  // Never expose stack traces or sensitive DB details to clients
  return {
    error: true,
    code: "INTERNAL_ERROR",
    message: "Terjadi kesalahan internal",
    statusCode: 500,
  };
};

export const notFound = (entity = "Data") =>
  new AppError(`${entity} tidak ditemukan`, 404, "NOT_FOUND");

export const unauthorized = (message = "Tidak diizinkan") =>
  new AppError(message, 403, "FORBIDDEN");

export const unauthenticated = (message = "Tidak terautentikasi") =>
  new AppError(message, 401, "UNAUTHENTICATED");

export const conflict = (message = "Data bentrok") =>
  new AppError(message, 409, "CONFLICT");

export const validationError = (message = "Validasi gagal") =>
  new AppError(message, 400, "VALIDATION_ERROR");
