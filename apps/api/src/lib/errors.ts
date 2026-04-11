import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: ContentfulStatusCode,
	) {
		super(message);
	}
}

export class ConflictError extends AppError {
	constructor(message = "Already exists") {
		super(message, 409);
	}
}
