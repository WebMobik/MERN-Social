import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'server', 'client'],
    transform: {
      "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
    },
    testEnvironment: process.env.TEST_ENV === 'server' ? 'node' : 'jsdom',
    preset: "ts-jest",
    transformIgnorePatterns: [
      "node_modules/(?!variables/.*)"
    ]
  }
}
