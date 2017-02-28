var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var precss  = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	context: __dirname,
	// 打包源文件也可以接收数组['a.js', 'b.js'] 既打包合并两个文件 
	// 也可以是键值 
	// entry: {
	// 	main: 'a.js',
	// 	b: 'b.js'
	// }
	entry:'./src/app.js',
	//生成目标文件
	output: {
		// 生成目标文件目录 
		path: './dist',
		// 目标文件文件名 如果entry是一个对象则使用[name].bundle.js 
		filename: 'js/[name].bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: 'html-loader'
				// 处理方式从右向左
				// loaders: [''] 也可以使用loaders
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: path.resolve(__dirname, 'node_modules'), // 排除的文件
				include: path.resolve(__dirname, 'src'),
				// include: './src/',// 打包的位置
				query: {
					presets: ["es2015"]
				}
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
				// 处理方式从右向左
				// loaders: [''] 也可以使用loaders
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!postcss-loader!less-loader'
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loaders: [
					'url-loader?limit=10000&name=assets/[name]-[hash:5].[ext]',
      				'image-webpack-loader'
				]
				// loader: 'url-loader'
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			// 打包之后的文件名
			filename: 'index.html',
			template: 'index.html',
			inject: 'body',
			title: 'welcome CJJ',
			chunks: ['main']//html 所引入的js文件
		}),
		new webpack.LoaderOptionsPlugin({
		    options: {
			    postcss: function () {
			     	return [precss, autoprefixer];
			     }
		  	}
		 })
	]

}