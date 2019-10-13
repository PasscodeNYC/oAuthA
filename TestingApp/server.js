const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const googleController = require('./GoogleOAuth/googleController.js');
const oAutha = require('oautha');
const PORT = 3000;

const app = express();

const githubController = require('./GitHubOauth/githubControllers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '/build')), (req, res, next) => {
  // console.log('served static bundle')
  next();
});

const CLIENT_ID = '006736e6a5d24fec84b8';
const CLIENT_SECRET = '5948964d94a3a5c596817bee02a8a01e6e929451';
const userAgent = 'tom';
//GitHub
app.get('/oauth', githubController.github(CLIENT_ID, CLIENT_SECRET, userAgent), (res, req) => {
  console.log('github oauth running');
});

//Google
//routes
app.get('/', (req, res, next) => {
  // oAutha.googleLogIn('please work')
  res.sendFile(path.resolve(__dirname, './index.html'), (req, res, err) => {
    if (err) console.log(err);
  });
});

app.get('/redirect', googleController.getTokens, (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './redirect.html'), (req, res, err) => {
    if (err) console.log(err);
  });
});

app.get('/build/bundle.js', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, './build/bundle.js'));
});

app.post('/login', (req, res, next) => {
  console.log('post request successful - login');
  res.redirect('/redirect');
});

app.post('/googlelogin', googleController.getAuthUrl, (req, res, next) => {
  console.log('google post request successful - login');

  res.redirect(`${res.locals.redirect}`);
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
