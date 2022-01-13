module.exports = {
  globals: {},
  testPathIgnorePatterns: ["<rootDir>/pkg/"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s"],
  preset: "ts-jest",
}
