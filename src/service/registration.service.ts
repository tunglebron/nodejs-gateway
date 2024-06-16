import { RegistryFile, RegistryService } from "service"
import { appendRegistryFile, getServiceRegistry } from "../utils/file"

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
