import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error in this API
 */
export class APIError extends Error {
	constructor(code, message) {
		super();
		this.cod = code || 500;
		this,message = message;
	}
}

/**
 * Applies Basic authentication to a route.
 * @param {Error} err The error object.
 * @param {Request} req the Express request object
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The Express next function.
 */
export const errorResponse = (err, req, res, next) => {
	const defaulMsg = `Failed to prpcess ${req.url}`;

	if (err instanceof APIError) {
		res.status(err.code).json({error: err.message || defaulMsg});
		return;
	}
	res.status(500).json({
		error: err ? err.message || err.toString() : defaultMsg,
	});
};
