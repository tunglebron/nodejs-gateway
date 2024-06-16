import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser"
import { logger } from "../utils/logger"

//import responseTime from "response-time"

export function settingThirdParty() {
	return [
		cors(),
		helmet(),
		morgan("combined", {
			stream: { write: (str: string) => logger.info(str) },
		}),
		bodyParser.json(),
		bodyParser.urlencoded({ extended: true }),
		// responseTime((req, _res, time) => {
		// 	console.log.apply(console, [req.method, req.url, time])
		// }),
	]
}
