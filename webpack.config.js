// Copyright (C) 2018 Alessandro Accardo a.k.a. kLeZ & Fabio Scotto di Santolo a.k.a. Plague
// 
// This file is part of Wash Ideas.
// 
// Wash Ideas is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Wash Ideas is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Wash Ideas.  If not, see <http://www.gnu.org/licenses/>.
// 

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var fs = require('fs');

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
		new webpack.BannerPlugin({
			banner: function () {
				return fs.readFileSync(path.resolve(__dirname, 'BANNER'), 'utf-8');
			}
		}),
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
