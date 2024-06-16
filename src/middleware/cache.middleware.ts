import * as apiCache from "apicache"
import { Request, Response } from "express"
import { RegistryCacheOptions } from "service"

const cache = apiCache.options({
	headers: {
		"cache-control": "no-cache",
	},
}).middleware

const cacheConditions = (req: Request, res: Response) => {
	const { cacheOptions }: { cacheOptions: RegistryCacheOptions } =
		res.locals.customRequest
	return req.method == "get" && res.statusCode === 200 && cacheOptions.enable
}

export const processCache = cache("2 minutes", cacheConditions)
