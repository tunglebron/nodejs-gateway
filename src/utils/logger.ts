import Log4js from "log4js"
import { LOGGER_CONFIG_FILE } from "../config"

Log4js.configure(LOGGER_CONFIG_FILE)
export const logger = Log4js.getLogger()
