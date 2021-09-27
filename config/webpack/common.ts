import path from "path";

import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

////////////////////////////////////////////////////////////////////////////////

export default (): Configuration => {
  const baseDir = path.resolve(__dirname + "/../..");

  return {
    entry: "@/App.tsx",

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(baseDir, "public/index.html"),
        publicPath: "/",
      }),
    ],

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(baseDir, "config/tsconfig.json"),
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                configFile: path.resolve(baseDir, "config/babel.json"),
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
            "ts-loader",
          ],
        },
      ],
    },
  };
};

////////////////////////////////////////////////////////////////////////////////

export interface WebpackEnv {
  ENV_PATH: string;
}
