const { compilerOptions } = require('./tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { default: tsjPreset } = require('ts-jest/presets');

module.exports = {
	transform: {
		...tsjPreset.transform,
		'.+\\.(css|style|less|sass|scss|svg|png|jpg|ttf|woff|woff2|pdf)$':
			'jest-transform-stub',
	},
	moduleDirectories: ['src', 'node_modules'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
