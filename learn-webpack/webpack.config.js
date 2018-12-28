module.exports = {
  entry: {
    home: './js/index.js',
    signup: './js/signup.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  }
}
