let Github = {}
const request = require('superagent')

//  https://github.com/login/oauth/authorize?client_id=006736e6a5d24fec84b8&scope=repo

Github.githubLogin = (clientID, scopes) => {

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
}

Github.githubToken = (clientId, clientSecret, userAgent) => {

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

      // if success, // make outgoing POST request with superagent.
      request
        .post('https://github.com/login/oauth/access_token')
        .send({ client_id: clientId, client_secret: clientSecret, code: code })
        .set('Accept', 'application/json')
        .then(result => {
          const data = result.body; // this contains our access token
          const accessToken = data.access_token;

          request
            .get('https://api.github.com/user')
            .set({
              Authorization: `token ${accessToken}`,
              'User-Agent': userAgent
            })
            .then(result => {
              console.log('your github data has been attached to res.locals.githubData')
              res.locals.githubData = result.body
              return next();
            })
            .catch(err => console.log('error: post request failed.', err.stack));
        })
        .catch(err => console.log('error: get request failed,', err));
    };
  }

  module.exports = Github
