import dotenv from "dotenv"
import path from "path"

dotenv.config()

export const PORT = Number(process.env.PORT) || 8080
export const RATE_LIMIT = Number(process.env.RATE_LIMIT) || 100
export const LOGGER_CONFIG_FILE = path.join(
	__dirname,
	"../../config-file/log4js.json",
)
export const SERVICE_REGISTRY_CONFIG_FILE = path.join(
	__dirname,
	"../../config-file/registry.json",
)
export const REGISTRATION_SERVICE_PATH = "/registration"
export const REQUEST_TYPE = {
	proxy: "proxy",
	api: "api",
}
