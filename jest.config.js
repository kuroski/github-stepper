module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  setupFilesAfterEnv: ["./tests/unit/setup.js"],
  moduleNameMapper: {
    "@unit(.*)$": "<rootDir>/tests/unit/$1"
  }
};
