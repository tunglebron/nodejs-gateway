import { promises } from "fs"
import { RegistryFile, RegistryService } from "service"
import { SERVICE_REGISTRY_CONFIG_FILE } from "../config"
import { logger } from "./logger"

const readFile = async (filePath: string) => {
	const data = await promises.readFile(filePath)
	return JSON.parse(data.toString())
}

const createJSONFile = async (
	filePath: string,
	content: object,
): Promise<void> => {
	await promises.writeFile(filePath, JSON.stringify(content))
}

export const appendRegistryFile = async (
	existingData: RegistryFile,
	services: { name: string; info: RegistryService[keyof RegistryService] }[],
): Promise<void> => {
	services.forEach((service) => {
		existingData.services[service.name] = service.info
	})

	await promises.writeFile(
		SERVICE_REGISTRY_CONFIG_FILE,
		JSON.stringify(existingData),
	)
}

export const getServiceRegistry = async (): Promise<RegistryFile> =>
	await readFile(SERVICE_REGISTRY_CONFIG_FILE).catch(
		async (err): Promise<RegistryFile> => {
			logger.error(`Could not read registry configuration file\n${err}`)
			const newRegisterFile: RegistryFile = {
				services: {},
			}
			await createJSONFile(SERVICE_REGISTRY_CONFIG_FILE, newRegisterFile)
				.then(() => logger.info(`Created a new registry configuration file`))
				.catch((err) =>
					logger.error(
						`Could not created a new registry configuration file\n${err}`,
					),
				)
			return newRegisterFile
		},
	)
