import { Router } from "express"
import { processCache } from "../middleware/cache.middleware"
import { requestMapping } from "../middleware/request-mapping.middleware"
import { handleServerError } from "../middleware/error-handler.middleware"
import { forwardRequests } from "../middleware/request-forwarding.middleware"
import { authenticate } from "../middleware/authentication.middleware"
import {
	modifyRegistryController,
	registerController,
	unregisterController,
} from "../controller/registration.controller"
import { REGISTRATION_SERVICE_PATH } from "../config"

const router: Router = Router()

router.post(REGISTRATION_SERVICE_PATH, registerController)

router.delete(REGISTRATION_SERVICE_PATH, unregisterController)

router.put(REGISTRATION_SERVICE_PATH, modifyRegistryController)

router.use(
	"/:apiName",
	// Authentication layer
	authenticate,
	// Mapping request with the gateway registration
	// If the request not found the response is returned
	requestMapping,
	// Checking if the registration request is using cache or not
	// If caching is enabled, only return the response with code is 200
	processCache,
	// Forward requests to the right handler registered
	forwardRequests,
	// Server error handler
	handleServerError,
)

export { router }
