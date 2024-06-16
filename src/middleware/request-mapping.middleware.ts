import { Response, Request, NextFunction } from "express"
import { getServiceRegistry } from "../utils/file"

export const requestMapping = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const registration = await getServiceRegistry()
	const apiName = req.params.apiName
	const service = registration.services[apiName]
	if (!service) {
		res.status(200).json({
			status: 400,
			message: "Request not found",
		})
	} else {
		res.locals.customRequest = {
			requestType: registration.services[apiName].type,
			requestUrl: registration.services[apiName].url,
			cacheOptions: registration.services[apiName].cache,
		}
		next()
	}
}
