const path = require("path");
const webpack = require("webpack");
// process.env.NODE_ENV = "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  name: "match-picture-game",
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./src/index",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
    new RefreshWebpackPlugin(),
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/dist",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
