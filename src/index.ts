import express from "express"
import { router } from "./router"
import { PORT } from "./config"
import { logger } from "./utils/logger"
import { limiter } from "./middleware/rate-limiting.middleware"
import { settingThirdParty } from "./middleware/third-party.middleware"

const app: express.Application = express()

// Disable express header
app.disable("x-powered-by")

// Use third party middlewares
settingThirdParty().forEach((setting) => app.use(setting))

// Apply rate limit settings
app.use(limiter)

// Set up routes
app.use(router)

app.listen(PORT, () => {
	logger.debug(`Server is running on port ${PORT}`)
})
