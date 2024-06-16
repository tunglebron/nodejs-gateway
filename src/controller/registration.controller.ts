import { NextFunction, Request, Response } from "express"
import { registryService } from "../service/registration.service"

export const registerController = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { name, type, url, cache } = req.body
	if (
		!(name && type && url && cache) &&
		!Object.hasOwn(Object.apply(cache), "enable")
	) {
		res.status(200).json({ status: 400, message: `Missing information` })
		return
	}
	if (typeof cache.enable != "boolean") {
		res.status(200).json({
			status: 400,
			message: `Cache information is wrong - enable must be a boolean`,
		})
		return
	}
	if (name == "register" || name == "register/") {
		res.status(200).json({
			status: 400,
			message: `Service name cannot be set to '${name}'`,
		})
		return
	}

	registryService(name, {
		type: type,
		url: url,
		cache: cache,
	})
		.then(() =>
			res.status(200).json({ status: 200, message: "Request successfully" }),
		)
		.catch((error: Error) => {
			error.cause == 1
				? res.status(200).json({ status: 400, message: error.message })
				: next(error)
		})
}
