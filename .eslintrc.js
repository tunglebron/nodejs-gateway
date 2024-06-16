/* eslint-env node */
module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"@typescript-eslint/no-var-requires": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
	},
	root: true,
}
