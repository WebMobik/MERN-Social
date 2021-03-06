import webpack from 'webpack'

const path = require('path')
const nodeExtenrals = require('webpack-node-externals')
const CURRENT_WORKING_DIR: string = process.cwd()

const config: webpack.Configuration = {
  name: 'server',
  entry: path.join(CURRENT_WORKING_DIR, 'server/server.ts'),
  output: {
    path: path.join(CURRENT_WORKING_DIR, 'dist'),
    filename: 'server.generated.js',
    publicPath: '/dist/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'node',
  externals: [nodeExtenrals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
}

module.exports = config
