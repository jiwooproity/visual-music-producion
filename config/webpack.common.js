const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// Hash 값이 다른 Bundle 파일들이 생성되다 보면, 정리가 귀찮기 때문에 빌드가 될 때마다 제거하고 새로 생성되도록 아래 플로그인을 추가한다.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

dotenv.config();

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "/dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        // 정규식 표현으로 확장자 탐색. 해당 확장자를 가진 파일은 탐색 대상이 된다.
        test: /\.(ts|tsx|js|jsx)$/,
        // 지정된 loader 모듈이 test에서 지정한 파일을 컴파일함.
        use: "babel-loader",
        // 컴파일 하지 않을 폴더나 파일 제외.
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, "../public")}/index.html`,
    }),
    new CleanWebpackPlugin({}),
    new webpack.DefinePlugin({
      "process.env.REACT_ENV_TEST": JSON.stringify(process.env.REACT_ENV_TEST),
    }),
  ],
};
