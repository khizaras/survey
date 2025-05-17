// Jest config for backend tests
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/backend"],
  testMatch: ["**/__tests__/**/*.js", "**/?(*.)+(spec|test).js"],
  moduleFileExtensions: ["js", "json", "node"],
};
