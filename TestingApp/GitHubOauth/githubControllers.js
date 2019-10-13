const express = require('express');
const app = express();
const request = require('superagent');

module.exports = {
  gitHub(req, res, next) {
    console.log('yay');
    const { query } = req;
    const { code } = query;

    console.log('query', query);
    console.log('code', code);

    if (!code) {
      console.log('ERROR, no code returned.');
      return res.send({
        success: false,
        message: 'Error: no code returned.'
      });
    }

    console.log('what is my client ID', CLIENT_ID);
    // if success, // make outgoing POST request with superagent.
    request
      .post('https://github.com/login/oauth/access_token')
      .send({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code: code })
      .set('Accept', 'application/json')
      .then(result => {
        const data = result.body; // this contains our access token
        console.log('my data back', data);
        // res.send(data); // here we would usually save the access token to a database
        const accessToken = data.access_token;
        console.log('my access token:', accessToken);
        // app.get('/user/', (req, res) => {
        //   console.log("in user!");

        request
          .get('https://api.github.com/user')
          .set({
            Authorization: `token ${accessToken}`,
            'User-Agent': userAgent
          })
          .then(result => {
            console.log('in result in 2nd oauth get request');
            console.log('response data from github: ', result.body);
            res.send(result.body);
            return next();
          })
          .catch(err => console.log('error: post request failed.', err.stack));
        // console.log('in get');
      })
      .catch(err => console.log('error: get request failed,', err));
  }
};
