import path from "path";

import { Configuration } from "webpack";
import { merge } from "webpack-merge";

import dotenv from "dotenv";

import common, { WebpackEnv } from "./common";

////////////////////////////////////////////////////////////////////////////////

export default (webpackEnv: WebpackEnv): Configuration => {
  const baseDir = path.resolve(__dirname + "/../..");

  const envPath = path.resolve(baseDir, webpackEnv.ENV_PATH);
  const env = loadEnv(envPath);

  console.log(`Typed ${envPath}: ${JSON.stringify(env)}`);

  return merge(common(), {
    mode: "production",

    output: {
      clean: true,
      publicPath: "/",
      path: path.resolve(baseDir, "build"),
      filename: "static/[contenthash:8].js",
      chunkFilename: "static/[contenthash:8].chunk.js",
    },
  });
};

////////////////////////////////////////////////////////////////////////////////

interface ProductionEnv {
  SLUG: string;
}

const loadEnv = (path: string): ProductionEnv => {
  const { error, parsed } = dotenv.config({ path });
  if (error) {
    throw error;
  }
  if (!parsed) {
    throw new Error(`Empty env file: ${path}`);
  }

  return {
    SLUG: parsed.SLUG,
  };
};
