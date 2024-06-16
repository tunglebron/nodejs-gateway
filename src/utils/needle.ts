import { NeedleResponse } from "needle"
import { NextFunction, Response } from "express"

export function needleCallBack(
	error: Error | null,
	needleRes: NeedleResponse,
	response: Response,
	next: NextFunction,
): void {
	if (error) throw next(error)
	response.header(needleRes.headers)
	response.status(needleRes.statusCode as number).send(needleRes.body)
}
