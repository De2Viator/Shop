const path = require('path');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main:'./public/index.js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader" ,"sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/i,
                type: "asset/resource",
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
          new HtmlMinimizerPlugin(),
        ],
    },
    plugins: [
      new MiniCssExtractPlugin({filename:'../css/[name].css'}),
      new CopyPlugin({
        patterns: [
          {
            context: path.resolve(__dirname, "./public"),
            from: "*.html",
            to:'../',
          },
          {
            context: path.resolve(__dirname, "./public/html"),
            from: "*.html",
            to:'../html'
          },
          {
            context: path.resolve(__dirname, './public/libraries/Vue'),
            from:'Vue.js',
            to:'./'
          },
          {
            context: path.resolve(__dirname, './public/libraries/bootstrap'),
            from:'bootstrap.js',
            to:'./'
          },
          {
            context: path.resolve(__dirname, './public/libraries/bootstrap'),
            from:'bootstrap.css',
            to:'../css'
          },
          {
            context: path.resolve(__dirname, './public/css'),
            from:'reset.css',
            to:'../css'
          },
          {
            context: path.resolve(__dirname, './public/libraries/font-awesome/'),
            from:'all.css',
            to:'../css'
          },
          {
            context: path.resolve(__dirname, "./public/fonts/webfonts"),
            from: "*.*",
            to:'../fonts/webfonts'
          },
        ],
    })],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/dist/js'),
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `../${filepath}/[name][ext]`;
        },
    },
    stats: {
        errorDetails: true
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public/dist'),
        },
        compress: true,
        hot:true,
    },
};