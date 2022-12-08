const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const APP_DIR = path.resolve(__dirname, "public/src/");
const BUILD_DIR = path.resolve(__dirname, "public/src/dist/");

//require("dotenv").config({ path: path.resolve(__dirname, "/config/.env") });

module.exports = {
    mode: "development",
    entry: {
        app: [
            "react-hot-loader/patch",
            APP_DIR + "/index.jsx"
        ],
    },
    output:{
        path: BUILD_DIR,
        filename: "[name].[contenthash].js",
        publicPath: "/",
        clean: true,
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "public/src"),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "react-hot-loader/webpack"
                    },
                    {
                        loader: "babel-loader",
                        options:{
                            presets:["@babel/preset-react"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-proposal-object-rest-spread",
                            ],
                        },
                    },
                    
                ],
            },
            {
                //style sheets
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                //images
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                //fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },

    plugins:[
        new HtmlWebPackPlugin({
            template: 'public/src/index.html',
            filename: "index.html",
            inject: "body",
            hash: true,
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devtool: "cheap-module-source-map", 
    devServer:{
        static: {
            directory: path.join(__dirname, "public/src/")
        },
        allowedHosts: 'all',
        hot: true,
        historyApiFallback: true,
        port: `${process.env.WEBPACK_DEV_SERVER_PORT}`,
        proxy: {
            "/api": {
                target: `http://${process.env.HOST}:${process.env.PORT}`,
                secure: false,
            },
        },
        https: false,
        host: '0.0.0.0',
    }
}