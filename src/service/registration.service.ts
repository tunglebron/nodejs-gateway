import { RegistryFile, RegistryService } from "service"
import {
	appendRegistryFile,
	readRegistryFile,
	modifyServiceRegistry,
	removeServiceRegistry,
	createRegistryFile,
} from "../model/registry.model"
import { logger } from "../utils/logger"
import { isFileExists } from "../utils/file"
import { SERVICE_REGISTRY_CONFIG_FILE } from "../config"

export const getServiceRegistry = async () => {
	if (!isFileExists(SERVICE_REGISTRY_CONFIG_FILE)) {
		// Create a new registry file
		await createRegistryFile()
			.then(() => logger.info(`Created a new registry configuration file`))
			.catch((err) =>
				logger.error(
					`Could not created a new registry configuration file\n${err}`,
				),
			)
	}
	return await readRegistryFile()
}

export const registryService = async (
	name: string,
	info: RegistryService[keyof RegistryFile],
) => {
	const registryFile: RegistryFile = await getServiceRegistry()
	if (registryFile.services[name])
		throw new Error(
			`Service with name '${name}' already exists, please set another name`,
			{ cause: 1 },
		)
	await appendRegistryFile(registryFile, [{ name: name, info: info }])
}

export const unregistryService = async (name: string) => {
	const registryFile: RegistryFile = await getServiceRegistry()
	if (!registryFile.services[name])
		throw new Error(`Service with name '${name}' is not exists`, { cause: 2 })
	await removeServiceRegistry(registryFile, name)
}

export const updateRegistryService = async (
	name: string,
	info: RegistryService[keyof RegistryFile],
) => {
	const registryFile: RegistryFile = await getServiceRegistry()
	if (!registryFile.services[name])
		throw new Error(`Service with name '${name}' is not exists`, { cause: 2 })
	await modifyServiceRegistry(registryFile, {
		name,
		info,
	})
}
