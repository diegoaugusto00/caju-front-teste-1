/** @type {import('jest').Config} */
export default {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
        babelConfig: true,
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/tests/"],
};
