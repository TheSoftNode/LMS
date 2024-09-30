import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    // globals: {
    //     'ts-jest': {
    //         useESM: true,
    //     },
    // },
    testEnvironment: 'node',
};


export default config;
