//this is the file that will be loaded when our module is required
let oGoogle = require('./Individual Modules/Google.js')

let oAutha = {}

oAutha.googleLogIn = oGoogle.googleLogIn

module.exports = oAutha