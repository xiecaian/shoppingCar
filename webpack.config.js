const path = require('path'),
      webpack = require('webpack'),
      uglify = require('uglifyjs-webpack-plugin'),
      htmlWebpackPlugin = require('html-webpack-plugin'),
      autoPrefixer = require('autoprefixer'),
     { CleanWebpackPlugin }= require('clean-webpack-plugin');

const config = {
    mode: 'development',//production
    entry:{
        index:path.resolve(__dirname,'./src/js/index.js') , //__dirname:绝对路径
        detail:path.resolve(__dirname,'./src/js/detail.js') , //__dirname:绝对路径 ,detail放在下面的chunks就可以在html中引入了相应的js
        shoppingCar:path.resolve(__dirname,'./src/js/shoppingCar.js') , //__dirname:绝对路径 ,detail放在下面的chunks就可以在html中引入了相应的js
    },
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/[name]-[hash].js'
    },
    module:{
        rules:[
                 {
                    test:/\.js$/, //所有js文件  \ 是转义符
                    loader: 'babel-loader',    //给ES6转成ES5
                    exclude:path.resolve(__dirname,'node_modules'),//排除
                    /*
                    query:{
                        "presets":["latest"] // 最新版本
                    }*/
                },
                {
                    test:/\.tpl$/,
                    loader: 'ejs-loader'
                },
                {
                    test:/\.css$/,
                    //配件是从下往上依次执行，故第一个放最后面
                    use:[
                        {
                            loader:'style-loader'//插入html
                        },
                        {
                            loader:'css-loader' //插入html
                        },
                        {
                            loader:'postcss-loader' , //加前缀
                            options:{
                                plugins:()=>autoPrefixer('last 5 versions')
                            }
                        }
                    ]
                },
                {
                    test:/\.scss$/,
                    //配件是从下往上依次执行，故第一个放最后面
                    use:[
                        {
                            loader:'style-loader'//插入html
                        },
                        {
                            loader:'css-loader' //插入html
                        },
                        {
                            loader:'postcss-loader' , //加前缀
                            options:{
                                plugins:()=>autoPrefixer('last 5 versions')
                            }
                        },
                        {
                            loader:'sass-loader' //插入html
                        },]
                },
                {
                    test:/\.(png|jpg|jpeg|gif|ico)$/i,
                    loader:[
                        'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                        'image-webpack-loader'
                    ]
                }
            ]
        },
        plugins: [
            new uglify(),  //压缩js
            new htmlWebpackPlugin({
                minify:{
                    removeComments:true,
                    collapseWhitespace:true  //去掉备注以及空格
                },
                filename: 'index.html',   // 输出的文件名为index.html
                template: path.resolve(__dirname, 'src/index.html'),//原文件，需要打包的文件，入口文件
    	        title: '商品首页',  //直接输出的title
                chunksSortMode: 'manual', //将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
                excludeChunks: ['node_modules'], //不让其打包
    	        chunks: ['index'], //需要引入的模块，不设置将引入所有产出的js
                hash: true,         //希望引入的模块后面需要带有hash
            }),
            new htmlWebpackPlugin({
                minify:{
                    removeComments:true,
                    collapseWhitespace:true  //去掉备注以及空格
                },
                filename: 'detail.html',   // 输出的文件名为index.html
                template: path.resolve(__dirname, 'src/detail.html'),//原文件，需要打包的文件，入口文件
    	        title: '商品详情页',  //直接输出的title
                chunksSortMode: 'manual', //将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
                excludeChunks: ['node_modules'], //不让其打包
    	        chunks: ['detail'], //需要引入的模块，不设置将引入所有产出的js
                hash: true,         //希望引入的模块后面需要带有hash
            }),

            new htmlWebpackPlugin({
                minify:{
                    removeComments:true,
                    collapseWhitespace:true  //去掉备注以及空格
                },
                filename: 'shoppingCar.html',   // 输出的文件名为index.html
                template: path.resolve(__dirname, 'src/shoppingCar.html'),//原文件，需要打包的文件，入口文件
    	        title: '购物车',  //直接输出的title
                chunksSortMode: 'manual', //将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
                excludeChunks: ['node_modules'], //不让其打包
    	        chunks: ['shoppingCar'], //需要引入的模块，不设置将引入所有产出的js
                hash: true,         //希望引入的模块后面需要带有hash
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['dist/js/*.js', 'dist/*.html']
            })
    
        ],
        devServer: {
          watchOptions: {
            ignored: /node_modules/
          },
          host: 'localhost',
          port: 80
        }

    };

module.exports = config;

/*
"webpack": "webpack --config webpack.config.js --progress --display-modules --colors"/* --progress 每次打包的进度 --display-modules 显示打包的模块 */
    //--colors 信息是彩色的  --display-reasons 打包的信息*/