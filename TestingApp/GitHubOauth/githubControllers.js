const express = require('express');
const app = express();
const request = require('superagent');

module.exports = {


  githubLogin (clientID, scopes) {

    return (req, res, next) => {
      let scopesStr = scopes.reduce( (a,b,i) => {
        //add scope string
        a+=b
        //add space after unless it's the very last scope - the index is 1 less than the length
        if (i < scopes.length-1) a+=`%20`
        return a
      },'')

      let baseUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=${scopesStr}`

      //use the url to redirect the user to the appropriate github login page
      res.redirect(baseUrl)
      next()      
    }

  },

  githubToken (id, secret, userAgent) {
    return (req, res, next) => {
      const { query } = req;
      const { code } = query;

      if (!code) {
        console.log('ERROR, no code returned.');
        return res.send({
          success: false,
          message: 'Error: no code returned.'
        });
      }

      console.log('what is my client ID', id);
      // if success, // make outgoing POST request with superagent.
      request
        .post('https://github.com/login/oauth/access_token')
        .send({ client_id: id, client_secret: secret, code: code })
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
              res.locals.gitHubData = req.body
              return next();
            })
            .catch(err => console.log('error: post request failed.', err.stack));
        })
        .catch(err => console.log('error: get request failed,', err));
    };
  }
};
