const googleController = {}
const { google } = require('googleapis')

googleController.getAuthUrl = (req, res, next) => {
    
    const oauth2Client = new google.auth.OAuth2(
        '957302849486-n5cqd4lub4me1aq49h3qpl2ctpn27fde.apps.googleusercontent.com',
        'uWgsX7fooylNUJYJJIN0D92e',
        'http://localhost:3000/redirect'
    )

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ];

    const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    
    // If you only need one scope you can pass it as a string
    scope: scopes
    });

    res.locals.redirect = url
    next()
}

googleController.getTokens = (req, res, next) => {
    
    const oauth2Client = new google.auth.OAuth2(
        '957302849486-n5cqd4lub4me1aq49h3qpl2ctpn27fde.apps.googleusercontent.com',
        'uWgsX7fooylNUJYJJIN0D92e',
        'http://localhost:3000/redirect'
    )

    let code = req.query.code
    console.log(code)

    let getTokenAsync = async function () {
        const {tokens} = await oauth2Client.getToken(code)
        console.log(tokens)
        return tokens
    }

    let tokens = getTokenAsync()
    
    oauth2Client.setCredentials(tokens);
    res.locals.tokens = tokens
    next()
}

googleController.useToken = (req, res, next) => {
    
}

module.exports = googleController