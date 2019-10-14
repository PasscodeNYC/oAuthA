//this is the file that will be loaded when our module is required
let Google = require('./Individual Modules/Google.js')
let Github = require('./Individual Modules/Github.js')
let LinkedIn = require('./Individual Modules/LinkedIn.js')

let oAutha = {}

//google
oAutha.googleLogin = Google.googleLogin
oAutha.googleToken = Google.googleToken

//github
oAutha.githubLogin = Github.githubLogin
oAutha.githubToken = Github.githubToken

//LinkedIn
oAutha.linkedInLogin = LinkedIn.login
oAutha.linkedInLogin = LinkedIn.token


module.exports = oAutha