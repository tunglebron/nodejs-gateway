import rateLimit from "express-rate-limit"
import { Response, Request } from "express"
import { RATE_LIMIT } from "../config"

export const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: RATE_LIMIT,
	handler: (_req, res: Response) => {
		res.status(200).json({
			status: 500,
			message: "Too many requests",
		})
	},
	skip: (req: Request) => {
		if (req.ip === "::1") return true
		return false
	},
})
