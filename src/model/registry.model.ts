import { RegistryFile, RegistryService } from "service"
import { readFile, writeFile } from "../utils/file"
import { SERVICE_REGISTRY_CONFIG_FILE } from "../config"

export const createRegistryFile = async () => {
	const newRegisterFile: RegistryFile = {
		services: {},
	}
	await writeFile(SERVICE_REGISTRY_CONFIG_FILE, JSON.stringify(newRegisterFile))
}

export const appendRegistryFile = async (
	existingData: RegistryFile,
	services: { name: string; info: RegistryService[keyof RegistryService] }[],
): Promise<void> => {
	services.forEach((service) => {
		existingData.services[service.name] = service.info
	})

	await writeFile(SERVICE_REGISTRY_CONFIG_FILE, JSON.stringify(existingData))
}

export const readRegistryFile = async (): Promise<RegistryFile> =>
	await readFile(SERVICE_REGISTRY_CONFIG_FILE)

export const removeServiceRegistry = async (
	existingData: RegistryFile,
	serviceName: string,
): Promise<void> => {
	delete existingData.services[serviceName]

	await writeFile(SERVICE_REGISTRY_CONFIG_FILE, JSON.stringify(existingData))
}

export const modifyServiceRegistry = async (
	existingData: RegistryFile,
	service: { name: string; info: RegistryService[keyof RegistryService] },
): Promise<void> => {
	existingData.services[service.name] = service.info

	await writeFile(SERVICE_REGISTRY_CONFIG_FILE, JSON.stringify(existingData))
}
