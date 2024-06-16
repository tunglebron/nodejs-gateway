declare module "service" {
	export interface RegistryFile {
		services: RegistryService
	}

	export type RegistryCacheOptions = {
		enable: boolean
	}

	export interface RegistryService {
		[key: string]: { type: string; url: string; cache: RegistryCacheOptions }
	}
}
