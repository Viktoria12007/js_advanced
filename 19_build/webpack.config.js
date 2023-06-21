const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env) => ({
  entry: './src/js/main.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', title: 'Форма оплаты', favicon: './src/img/favicon.png',
    }),
    new MiniCssExtractPlugin({ filename: 'main.[contenthash].css' }),
  ],
  devtool: env.prod ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    nodeEnv: 'production',
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
});
