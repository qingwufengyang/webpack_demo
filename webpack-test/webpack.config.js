var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 打包源文件也可以接收数组['a.js', 'b.js'] 既打包合并两个文件 
	// 也可以是键值 
	// entry: {
	// 	main: 'a.js',
	// 	b: 'b.js'
	// }
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js',
		b: './src/script/b.js'
	},
	//生成目标文件
	output: {
		// 生成目标文件目录 
		path: './dist',
		// 目标文件文件名 如果entry是一个对象则使用[name].bundle.js 
		filename: 'js/[name].js',
		// 上线时候写的
		publicPath: 'http://cdn.com/'
	},
	plugins: [
		new htmlWebpackPlugin({
			// 打包之后的文件名
			filename: 'a.html',
			template: 'index.html',
			inject: false,// script 放在哪个标签中
			title: 'welcome A',
			chunks: ['a', 'main']//html 所引入的js文件
			// excludeChunks: ['a'] 排除哪个js不引入
		}),
		new htmlWebpackPlugin({
			// 打包之后的文件名
			filename: 'b.html',
			template: 'index.html',
			inject: false,// script 放在哪个标签中
			title: 'welcome B',
			chunks: ['b', 'main']
		})
	]

}