var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		main: './src/typescript/index.tsx'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "awesome-typescript-loader"
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'main.css'
		}),
	]
};