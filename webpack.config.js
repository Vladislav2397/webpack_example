const VueLoaderPlugin = require('vue-loader-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path")

module.exports = {
    mode: 'production',
    entry: {
        app: './src/main.js',
    },
    output: {
        path: __dirname + '/dist',
        chunkFilename: 'js/[id].chunk.js',
    },
    resolve: {
        extensions: [
            '*', '.js', '.ts', '.vue', '.scss', '.css', '.html'
        ],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /critical\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.scss$/,
                exclude: /critical\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-bem-plain-loader',
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/],
                        },
                    },
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 1024,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.[hash].css',
            chunkFilename: 'css/[hash].css',
            insert: linkTag => {
                document.body.appendChild(linkTag)
            },
        }),
        new VueLoaderPlugin(),
    ]
}
