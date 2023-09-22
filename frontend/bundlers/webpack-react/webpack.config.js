const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill','./src/index.jsx'],
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].[hash].js"
    },
    plugins: [
        new HTMLWebpackPlugin({template: "src/index.html"}),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    devServer: {
        port : 6868
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json','.jsx'],
        alias: {
            '@models' : path.resolve(__dirname,'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"]
            },
            {
                test : /\.(jpg)/,
                use: ['file-loader']
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env' , '@babel/preset-react']
                    }
                }]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ]
    }
}
