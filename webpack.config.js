const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: "development",
  watch: true,
  devServer: {
    open: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "main.js",
  },
  resolve: {
    extensions: [
      ".tsx", ".ts", ".js", ".jsx",
    ]
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /(\.ts|\.tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /(\.css|\.s[a|c]ss)$/,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  plugins: [
    htmlPlugin
  ],
}