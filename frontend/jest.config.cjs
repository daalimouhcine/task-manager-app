// jest.config.cjs
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  setupFiles: ["<rootDir>/src/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
        },
      },
    ],
  },
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx)",
    "<rootDir>/src/**/?(*.)(test|spec).(ts|tsx)",
  ],
};
