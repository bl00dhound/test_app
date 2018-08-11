const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require("cssnano");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	target: 'web',
	entry: {
		app: ['./src/assets/index.css', './src/app.js'],
		vendor: ['react', 'react-dom', 'react-router-dom']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'app.bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('index.min.css'),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: cssnano,
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		})
	],
	module: {
		rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ["env", "react", "stage-2"]
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css-loader', 'style-loader', )
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					chunks: 'initial',
					filename: 'vendor.bundle.js'
				},
			},
		}
	},
	devtool: 'source-map',
	devServer: {
		contentBase: [path.resolve(__dirname, './dist'), path.resolve(__dirname, './dist/js'), path.resolve(__dirname, './dist/css')],
		inline: true,
		port: 9999
	}
}