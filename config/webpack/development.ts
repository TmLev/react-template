import path from "path";

import { Configuration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";

import dotenv from "dotenv";

import common, { WebpackEnv } from "./common";

////////////////////////////////////////////////////////////////////////////////

export default (
  webpackEnv: WebpackEnv
): Configuration & { devServer?: WebpackDevServer.Configuration } => {
  const baseDir = path.resolve(__dirname + "/../..");

  const envPath = path.resolve(baseDir, webpackEnv.ENV_PATH);
  const env = loadEnv(envPath);

  console.log(`Typed ${envPath}: ${JSON.stringify(env)}`);

  return merge(common(), {
    mode: "development",

    output: {
      clean: true,
      publicPath: "/",
      path: path.resolve(baseDir, "build"),
      filename: "static/[name].js",
      chunkFilename: "static/[name].chunk.js",
    },

    devServer: {
      host: env.HOST,
      port: env.PORT,
      hot: false,
      liveReload: env.ENABLE_HOT_RELOADING,
      compress: env.COMPRESS,
    },
  });
};

////////////////////////////////////////////////////////////////////////////////

interface DevelopmentEnv {
  HOST: string;
  PORT: number;
  ENABLE_HOT_RELOADING: boolean;
  COMPRESS: boolean;
}

const loadEnv = (path: string): DevelopmentEnv => {
  const { error, parsed } = dotenv.config({ path });
  if (error) {
    throw error;
  }
  if (!parsed) {
    throw new Error(`Empty env file: ${path}`);
  }

  return {
    HOST: parsed.HOST,
    PORT: +parsed.PORT,
    ENABLE_HOT_RELOADING: stringToBoolean(parsed.ENABLE_HOT_RELOADING),
    COMPRESS: stringToBoolean(parsed.COMPRESS),
  };
};

////////////////////////////////////////////////////////////////////////////////

const stringToBoolean = (s: string): boolean => {
  return s.toLowerCase() === "true";
};
