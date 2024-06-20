import { NextFunction, Request, Response } from "express"
import {
	registryService,
	unregistryService,
	updateRegistryService,
} from "../service/registration.service"
import { REGISTRATION_SERVICE_PATH } from "../config"

export const registerController = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	function isRequestValid(req: Request, res: Response) {
		const { name, type, url, cache } = req.body
		if (
			!(name && type && url && cache) &&
			!Object.hasOwn(Object.apply(cache), "enable")
		) {
			res.status(200).json({ status: 400, message: `Missing information` })
			return false
		}
		if (typeof cache.enable != "boolean") {
			res.status(200).json({
				status: 400,
				message: `Cache information is wrong - enable must be a boolean`,
			})
			return false
		}
		if (
			name.startsWith(REGISTRATION_SERVICE_PATH.substring(1)) ||
			name.startsWith(REGISTRATION_SERVICE_PATH)
		) {
			res.status(200).json({
				status: 400,
				message: `Service name cannot be set to '${name}'`,
			})
			return false
		}

		return true
	}

	if (!isRequestValid(req, res)) return

	const { name, type, url, cache } = req.body

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

export const unregisterController = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const name = req.query.name as string

	if (!name) {
		res.status(200).json({ status: 400, message: `Missing service name` })
		return
	}
	if (
		name.startsWith(REGISTRATION_SERVICE_PATH.substring(1)) ||
		name.startsWith(REGISTRATION_SERVICE_PATH)
	) {
		res.status(200).json({
			status: 400,
			message: `Cannot unregister service '${name}'`,
		})
		return
	}

	unregistryService(name)
		.then(() =>
			res.status(200).json({ status: 200, message: "Request successfully" }),
		)
		.catch((error: Error) => {
			error.cause == 2
				? res.status(200).json({ status: 400, message: error.message })
				: next(error)
		})
}

export const modifyRegistryController = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	function isRequestValid(req: Request, res: Response) {
		const { type, url, cache } = req.body
		if (
			!(type && url && cache) &&
			!Object.hasOwn(Object.apply(cache), "enable")
		) {
			res.status(200).json({ status: 400, message: `Missing information` })
			return false
		}
		if (typeof cache.enable != "boolean") {
			res.status(200).json({
				status: 400,
				message: `Cache information is wrong - enable must be a boolean`,
			})
			return false
		}

		return true
	}

	const name = req.query.name as string
	const { type, url, cache } = req.body
	if (
		name.startsWith(REGISTRATION_SERVICE_PATH.substring(1)) ||
		name.startsWith(REGISTRATION_SERVICE_PATH)
	) {
		res.status(200).json({
			status: 400,
			message: `Service name cannot be set to '${name}'`,
		})
		return false
	}

	if (!isRequestValid(req, res)) return

	updateRegistryService(name, { type, url, cache })
		.then(() =>
			res.status(200).json({ status: 200, message: "Request successfully" }),
		)
		.catch((error: Error) => {
			error.cause == 2
				? res.status(200).json({ status: 400, message: error.message })
				: next(error)
		})
}
