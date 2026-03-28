import type { ErrorRequestHandler } from "express";
import { responseError } from "../utils/responseError";

export const errorHandler: ErrorRequestHandler = (
	error,
	_request,
	response,
	_next,
) => {
	console.error(error);

	response.status(500).json(
		responseError({
			code: "SERVER_ERROR",
			message: "An unexpected server error occurred",
		}),
	);
};
