let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");

module.exports = {
	entry: ["./client/src/index.js"],

	output: {
		path: __dirname + "/public/dist",
		filename: "index.js"
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["transform-class-properties"]
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},      {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					"file-loader"
				]
			}
		],
	},

	plugins: [
		new HtmlWebpackPlugin({template: "./client/src/index.html" }),
		/*
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		})
		*/
	],

	devServer: {
		historyApiFallback: true,
	}
};