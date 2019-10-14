1. get to the google website and sign up your app
    Client ID:
        957302849486-n5cqd4lub4me1aq49h3qpl2ctpn27fde.apps.googleusercontent.com

    Client Secret:
        uWgsX7fooylNUJYJJIN0D92e

You stuff should be in https://console.developers.google.com/

2. Check this guide: https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization

3. npm install googleapis

4. require it into your file 
    - const {google} = require('googleapis')

5. declare a new google.auth.OAuth2 object to fill with your parameters like this:
    
        const const oauth2Client = new google.auth.OAuth2(
            YOUR_CLIENT_ID,
            YOUR_CLIENT_SECRET,
            YOUR_REDIRECT_URL
        );

6. Now put in the 'scopes' that you're going to need access to. aka sign in for this example:

    const scopes = [
        'https://www.googleapis.com/auth/blogger',
        'https://www.googleapis.com/auth/calendar'
    ];

7. Now generate the url you want to use to ask permissions from google for your scopes: 

    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',

        scope: scopes
    });

8. Now google redirects to the redirect URL you gave it and gives you this parameter in the query:

    GET /oauthcallback?code={authorizationCode}

9. Now with that authorizationCode we can go back to google and ask them for an access token to use their data like this:

    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);

