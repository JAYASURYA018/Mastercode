var webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.tsx'),   
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({ //<--key to reduce React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    performance: {
        maxEntrypointSize: 1000000, //1MB
        maxAssetSize: 1000000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.m?js/,
                resolve: {
                    //fullySpecified: false
                }
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader', // post process the compiled CSS                   
                    {
                        loader:  'sass-loader', // compiles Sass to CSS, using Node Sass by default
                        options: {
                        indentedSyntax: true
                      }
                    }
                ]
            },           
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'src/images/[name].[hash:4].[ext]'
                            //outputPath: 'images/'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: "bundle.js",
        chunkFilename: '[name].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        inline: true,       
    },
};