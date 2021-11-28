const path = require('path')
module.exports = {
    entry:'./index.js',
    mode:'production', 
    output:{
        filename:'bundle.cjs',
        path: path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:'/node_modules/'
            }
        ]
    },
    resolve:{
        extensions: ['.js'],
        mainFields:['browser', 'module', 'main']
    },
    target:'node16.13'
    
}