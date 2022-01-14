const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: {
        app: './src/main.js'
        // critical: './src/assets/scss/critical.scss',
        // main: './src/assets/scss/main.scss',
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue': path.resolve('./node_modules/vue'),
            'vuex': path.resolve('./node_modules/vuex'),
            'vue-class-component': path.resolve('./node_modules/vue-class-component'),
            'vue-property-decorator': path.resolve('./node_modules/vue-property-decorator'),
        },
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            { collapseGroups: false },
                            { removeEmptyContainers: false },
                            { cleanupIDs: false },
                            { removeViewBox: false },
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader',
                    },
                    esModule: true,
                    compilerOptions: {
                        preserveWhitespace: false,
                    },
                },
            },
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /node_modules/,
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
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.scss$/,
                use: isProd
                    ? [
                          MiniCssExtractPlugin.loader,
                          'css-loader',
                          {
                              loader: 'postcss-loader',
                              options: {
                                  sourceMap: true,
                                  config: {
                                      path: `./postcss.config.js`,
                                  },
                              },
                          },
                          'sass-loader',
                      ]
                    : [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-bem-plain-loader',
                ],
            },
            {
                test: /\.(frag|vert|glsl)$/,
                use: [
                    {
                        loader: 'glsl-shader-loader',
                        options: {},
                    },
                ],
            },
        ],
    },
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                },
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        },
    },
    plugins: isProd
        ? [
              new VueLoaderPlugin(),
              new webpack.optimize.ModuleConcatenationPlugin(),
              new MiniCssExtractPlugin({
                  filename: '[name].min.[chunkhash].css',
              }),
          ]
        : [
              new VueLoaderPlugin(),
              new FriendlyErrorsPlugin(),
          ],
}