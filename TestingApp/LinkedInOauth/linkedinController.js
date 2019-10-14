const request = require('superagent');

module.exports = {
  linkedinLogin: (id, secret, redirect, state) => {
    return (req, res, next) => {
      request
        .get(
          `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${id}&redirect_uri=${redirect}&state=${state}&scope=r_liteprofile%20r_emailaddress%20w_member_social`
        )
        .then(data => {
          res.redirect(data.redirects);
          return next();
        })
        .catch(err => {
          if (err) res.status(500).sent('SERVER ERROR');
          console.log('LOGIN GET REQUEST ERROR');
        });
    };
  },

  linkedinToken: (id, secret, redirect, state) => {
    return (req, res, next) => {
      const reqCode = req.query.code;
      const reqState = req.query.state;
      if (state !== reqState) {
        res.status(500).send('Server Error');
        return next();
      }
      request
        .post('https://www.linkedin.com/oauth/v2/accessToken')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(
          `grant_type=authorization_code&code=${reqCode}&redirect_uri=${redirect}&client_id=${id}&client_secret=${secret}`
        )
        .then(data => {
          const access_token = data.body.access_token;
          request
            .get('https://api.linkedin.com/v2/me')
            .set('Connection', 'Keep-Alive')
            .set('Authorization', `Bearer ${access_token}`)
            .then(data => console.log(data));
        });
    };
  }
};