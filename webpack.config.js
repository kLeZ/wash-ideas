var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');

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
		alias: {
			'fs': 'browserfs/dist/shims/fs.js',
			'buffer': 'browserfs/dist/shims/buffer.js',
			'path': 'browserfs/dist/shims/path.js',
			'processGlobal': 'browserfs/dist/shims/process.js',
			'bufferGlobal': 'browserfs/dist/shims/bufferGlobal.js',
			'bfsGlobal': require.resolve('browserfs')
		}
	},
	module: {
		noParse: /browserfs\.js/,
		rules: [{
			test: /\.(ts|tsx)$/,
			loader: "ts-loader",
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}, {
			test: /\.(woff|woff2|eot|ttf|svg)$/,
			loader: 'file-loader?name=fonts/[name].[ext]'
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			BrowserFS: 'bfsGlobal',
			process: 'processGlobal',
			Buffer: 'bufferGlobal'
		}),
		new ExtractTextPlugin({
			filename: 'main.css'
		}),
		new Visualizer()
	],
	node: {
		process: false,
		Buffer: false
	}
};