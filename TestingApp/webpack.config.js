const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        publicPath: '/build/',
        hot: true,
        port: 8080,
        proxy: [{
          context: ['/getdata' ,'/newprice'],
          target: 'http://localhost:3000'
          }]
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              
              }
            }
          },
          {
              test: /\.css$/,
              use:  ['style-loader', 'css-loader']
          }
        ]
      }

}