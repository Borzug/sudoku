const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'json'],
    },
    plugins: [new CleanWebpackPlugin(['dist']), new webpack.HotModuleReplacementPlugin()],
};
