const path = require("path");
const os = require('os');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const {InjectManifest} = require('workbox-webpack-plugin');

// process.traceDeprecation = true;

const getLocalExternalIP = () => [].concat(...Object.values(os.networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address

const STATIC_PORT = 8080;

module.exports = (env, argv) => {
    const devMode = !argv || (argv.mode !== 'production');
    let addr = getLocalExternalIP() || 'localhost';
    return {

        entry: {main: "./src/index.js"},
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: devMode ? "[name].js" : "[name].[contenthash].js",
            publicPath: devMode ? "/" : "./dist/"
            // publicPath: "./dist/"
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader'],
                }
            ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    mangle: true,
                    // compress: {
                    //     drop_console: true
                    // }
                }
            }), new CssMinimizerPlugin()],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
                filename: devMode ? "./index.html" : "../index.html",
                inject: 'head'
                // filename: 'index.html'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css'
            }),
            ...(devMode ? [] : [new InjectManifest({
                swDest: '../sw.js',
                swSrc: './src/sw.js'
            })]),
            new webpack.DefinePlugin({
                __USE_SERVICE_WORKERS__: !devMode
            })
        ],
        devServer: {
            // contentBase: path.resolve(__dirname, "src"),
            disableHostCheck: true,
            compress: true,
            port: STATIC_PORT,
            hot: true,
            open: true,
            host: '0.0.0.0',
            public: addr + ':' + STATIC_PORT,
            // clientLogLevel: 'debug',
            // watchContentBase: true,
        }
    }
};
