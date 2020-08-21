module.exports={
    mode: "development",
    entry: './frontEnd/src/app.js',
    output:{
        path: __dirname+'/backEnd/public',
        filename: 'bundle.js'
    }
}