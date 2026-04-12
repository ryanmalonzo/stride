import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
	constructor(
		public message: string = "",
		public statusCode: ContentfulStatusCode,
	) {
		super(message);
	}
}

export class ConflictError extends AppError {
	constructor(message?: string) {
		super(message, 409);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message?: string) {
		super(message, 401);
	}
}
