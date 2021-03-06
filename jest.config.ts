import type { Config } from '@jest/types'
// const config: Config.InitialOptions = {
//     verbose: true,
//     moduleFileExtensions: ["ts", "tsx"],
//     moduleDirectories: ["node_modules", "server", "client"],
//     transform: {"\\.[jt]sx?$": "babel-jest"}
// };

// export default config;

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules', 'server', 'client'],
    transform: { '\\.t[sx]?$': 'ts-jest' },
    // testEnvironment: 'node',
    preset: '@shelf/jest-mongodb',
  }
}
