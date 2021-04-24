import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'server', 'client'],
    // transform: { '\\.t[sx]?$': 'ts-jest' },
    transform: {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    testEnvironment: 'node',
    // preset: '@shelf/jest-mongodb',
    preset: "ts-jest",
    transformIgnorePatterns: [
      "node_modules/(?!variables/.*)"
    ]
  }
}
