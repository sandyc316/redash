
const fs = require("fs");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
// const LessPluginAutoPrefix = require("less-plugin-autoprefix");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const appPath = fs.realpathSync(path.join(__dirname, "client"));


module.exports = function () {
    return {
        mode: "development",
        entry: { 
            styles: ["./assets/less/main.less"],
            server: ["./assets/less/server.less"],
            app: ['./main.ts']
        },
        output: {
            path: __dirname + '/client/dist',
            filename: '[name].js',
            publicPath: "/static/"
        },
        context: path.resolve(__dirname, 'client'),
        resolve: {
            alias: {
                "@app": path.resolve(__dirname, 'client', 'app')
            },
            extensions: ['.ts', '.js', '.json']
        },
        plugins: [
            new CopyWebpackPlugin([
                { from: "./assets/css/*.css", to: "styles/", flatten: true },
                { from: "./assets/images/*", to: "images/", flatten: true },
                { from: "./assets/images/db-logos/*", to: "images/db-logos/", flatten: true },
                { from: "../node_modules/jquery/dist/jquery.min.js", to: "js/jquery.min.js" }
            ]),
            new HtmlWebpackPlugin({
                template: __dirname + '/client/index.html',
                output: __dirname + '/client/dist',
                filename: 'index.html',
                excludeChunks: ["server"]
            }),
            // new ExtractTextPlugin({
            //     filename: "[name].[chunkhash].css"
            // }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: "[name].[chunkhash].css"
                // chunkFilename: "[id].css"
            }),
            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: './client/app/app.module#AppModule',
                genDir: "./ngfactory",
                sourceMap: true
            }),
            new ManifestPlugin({
                fileName: "asset-manifest.json",
                basePath: "",
                publicPath: ""
            }),
        ],
        module: {
            rules: [
                { test: /\.ts$/, loader: '@ngtools/webpack'},
                { test: /\.html$/, loader: 'raw-loader' },
                {
                    test: /\.css$/,
                    use: "raw-loader",
                    include: path.resolve(__dirname, 'node_modules', '@swimlane')
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it use publicPath in webpackOptions.output
                                publicPath: '../'
                            }
                        },
                        "css-loader"
                    ],
                    exclude: path.resolve(__dirname, 'node_modules', '@swimlane')
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: "css-loader" },
                        { loader: "less-loader", options: { javascriptEnabled: true } }
                    ],
                    exclude: path.resolve(__dirname, 'node_modules', '@swimlane')
                },
                {
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                // context: path.resolve(appPath, "./assets/images/"),
                                outputPath: "images/",
                                name: "[path][name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.geo\.json$/,
                    use: [
                        {
                           loader: "file-loader",
                            options: {
                                outputPath: "data/",
                                name: "[hash:7].[name].[ext]"
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                name: "fonts/[name].[hash:7].[ext]"
                            }
                        }
                    ]
                }
            ]
        }
    };
}
