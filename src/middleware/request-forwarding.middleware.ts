import needle from "needle"
import { Request, Response, NextFunction } from "express"
import { needleCallBack } from "../utils/needle"
import { createProxy } from "../utils/proxy"
import { REQUEST_TYPE } from "../config"

export const forwardRequests = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	function handleResponse(
		error: Error | null,
		response: needle.NeedleResponse,
	): void {
		try {
			needleCallBack(error, response, res, next)
		} catch (error) {
			next(error)
		}
	}
	const {
		requestType,
		requestUrl,
	}: { requestType: string; requestUrl: string } = res.locals.customRequest
	if (requestType == REQUEST_TYPE.proxy) {
		createProxy(requestUrl)(req, res, next)
	} else if (requestType == REQUEST_TYPE.api) {
		const url =
			requestUrl +
			(req.params.path ? req.params.path : "") +
			(req.query ? req.query : "")
		switch (req.method.toLowerCase()) {
			case "get":
				needle.get(url, handleResponse)
				break
			case "post":
				needle.post(url, req.body, handleResponse)
				break
			case "put":
				needle.put(url, req.body, handleResponse)
				break
			case "delete":
				needle.delete(url, req.body, handleResponse)
				break
			case "patch":
				needle.patch(url, req.body, handleResponse)
				break
			case "head":
				needle.head(url, handleResponse)
				break
			default:
				next(new Error("Invalid request method:" + req.method))
				break
		}
	}
}
