const express = require('express');
const cookieParser = require('cookie-parser');
const app=express();
const port=8000; 

//for layouts
const expressLayout=require('express-ejs-layouts');

const db=require('./config/mongoose')

//used for session cookie
const session= require('express-session');
const passport= require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const customMware=require('./config/middleware');

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// for ejs
app.set('view engine','ejs');
app.set('views','./views')

app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://0.0.0.0:27017/codeial_development',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err|| 'connect-mongodb setup ok');
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

app.use("/",require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running on port ${port}`);
    }
    console.log(`server is running on port : ${port}`);
})