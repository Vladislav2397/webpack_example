const VueLoaderPlugin = require('vue-loader-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist'
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
                test: /main\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
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
                test: /(?<!critical|main)\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'debug-loader',
                    'sass-loader',
                ]
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
    devServer: {
        static: path.resolve(__dirname, 'public'),
        port: 1024,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new VueLoaderPlugin(),
    ]
}
