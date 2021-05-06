import * as webpack from 'webpack';
const path = require('path');
const CURRENT_WORKING_DIR: string = process.cwd()

const config: webpack.Configuration = {
    name: 'browser',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.join(CURRENT_WORKING_DIR, 'client/main.tsx'),
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            path: require.resolve('path-browserify')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                // options: {
                //     presets: ['@babel/preset-react', '@babel/preset-typescript']
                // },
                exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
}

module.exports = config
