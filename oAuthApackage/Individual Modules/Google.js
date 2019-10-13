let oGoogle = {}

//googleLogIn requires the Client ID, the Client Secret, 
//and the Redirect URL as inputs
//then it will accept an array of 'scopes'
//the trick will be getting it the res, req, next inputs as middleware

oGoogle.googleLogin = (clientID, clientSecret, redirectUrl, scopes) => {
    console.log('running get Auth Test')

    return function (req, res, next) {
        const oauth2Client = new google.auth.OAuth2(clientID,clientSecret, redirectUrl)
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        })
        console.log(url)
        res.locals.redirect = url
        next()
    }   
}

//part 2 of the google oauth gets you the token, it required the 
oGoogle.googleToken = (clientID, clientSecret, redirectUrl) => {
    return function (req,res, next) {
        const oauth2Client = new google.auth.OAuth2(clientID,clientSecret, redirectUrl)

        let code = req.query.code

        let getTokenAsync = async function () {
            const {tokens} = await oauth2Client.getToken(code)
            oauth2Client.setCredentials(tokens);
            res.locals.tokens = tokens
            console.log(res.locals.tokens)
            next()
        }
        let tokens = getTokenAsync() 
    }   
}

module.exports = oGoogle


