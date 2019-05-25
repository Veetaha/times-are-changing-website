const tsconfig = require('./tsconfig.json');
const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);

module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: [ "ts", "js" ],
    rootDir:   "src",
    testRegex: ".spec.ts$",
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    collectCoverage: true,
    moduleNameMapper
};