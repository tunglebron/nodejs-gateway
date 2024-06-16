import { Errback, Response, Request, NextFunction } from "express"

export const handleServerError = (
	err: Errback,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) => {
	res.status(200).json({
		status: 500,
		message: err.toString(),
	})
}
