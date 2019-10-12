const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch')
const googleController = require('./GoogleOAuth/googleController.js')
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(bodyParser.json())


app.use(express.static(path.resolve(__dirname, '/build')),(req, res,next)=>{
    // console.log('served static bundle')
    next();
})


//routes
app.get('/', (req, res, next)=>{
    res.sendFile(path.resolve(__dirname, './index.html'), (req,res,err)=>{
        if (err) console.log(err)
    })
})

app.get('/redirect', googleController.getTokens,(req, res, next)=>{
    res.sendFile(path.resolve(__dirname, './redirect.html'), (req, res,err)=>{
        if (err) console.log(err)
    })
})

app.get('/build/bundle.js', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, './build/bundle.js'))
})

app.post('/login', 
  (req, res, next) => {
    console.log('post request successful - login')
    res.redirect('/redirect')
  });

app.post('/googlelogin', googleController.getAuthUrl, (req, res, next) => {
    console.log('google post request successful - login')
    
    res.redirect(`${res.locals.redirect}`)
  });

app.use('*', (req,res) => {
    res.status(404).send('Not Found');
  });

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });
