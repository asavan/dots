const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const os = require('os');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HashOutput = require('webpack-plugin-hash-output');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

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
            filename: devMode ? "[name].js" : "[name].[chunkhash].js",
            publicPath: devMode ? "/" : "./dist/"
            // publicPath: "./dist/"
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: '../',
                            hmr: devMode,
                        },
                    }, 'css-loader'],
                }
            ]
        },
        optimization: {
            minimizer: [new TerserJSPlugin({
                terserOptions: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                }
            }), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HashOutput(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                minify: false,
                filename: devMode ? "./index.html" : "../index.html",
                inject: 'head'
                // filename: 'index.html'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'async'
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css'
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
