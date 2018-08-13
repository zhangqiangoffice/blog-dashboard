module.exports = {
    devServer: {
        port: 8086,
        proxy: 'http://localhost:8083'
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].chunksSortMode = 'none'
                return args
            })
    }
}
