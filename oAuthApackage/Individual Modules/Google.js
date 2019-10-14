const { google } = require('googleapis')

let Google = {}

//googleLogIn requires the Client ID, the Client Secret, 
//and the Redirect URL as inputs
//then it will accept an array of 'scopes'
//the trick will be getting it the res, req, next inputs as middleware

Google.googleLogin = (clientID, clientSecret, redirectUrl, scopes) => {

    return function (req, res, next) {
        const oauth2Client = new google.auth.OAuth2(clientID,clientSecret, redirectUrl)
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        })
        res.locals.redirect = url
        console.log('your google authUrl has been saved on res.locals.redirect')
        res.redirect(`${res.locals.redirect}`)
        next()
    }   
}

//part 2 of the google oauth gets you the token, it required the 
Google.googleToken = (clientID, clientSecret, redirectUrl) => {
    return function (req,res, next) {
        const oauth2Client = new google.auth.OAuth2(clientID,clientSecret, redirectUrl)

        let code = req.query.code

        let getTokenAsync = async function () {
            const {tokens} = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens);
            res.locals.tokens = tokens
            console.log('your google token has been saved on res.locals.tokens')
            next()
        }
        let tokens = getTokenAsync() 
    }   
}

module.exports = Google


