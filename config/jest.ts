import path from "path";

import type { Config } from "@jest/types";

const baseDir = path.resolve(__dirname + "/..");

const config: Config.InitialOptions = {
  preset: "ts-jest",

  rootDir: baseDir,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],

  maxConcurrency: 4,
};

export default config;
