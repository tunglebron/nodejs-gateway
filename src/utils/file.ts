import { promises, existsSync } from "fs"

export const readFile = async (filePath: string) => {
	const data = await promises.readFile(filePath)
	return JSON.parse(data.toString())
}

export const writeFile = async (
	filePath: string,
	content: string,
): Promise<void> => {
	await promises.writeFile(filePath, content)
}

export const isFileExists = (filePath: string): boolean => existsSync(filePath)
