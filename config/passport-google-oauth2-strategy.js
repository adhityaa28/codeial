const passport= require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User= require('../models/user');




passport.use(new googleStrategy({
        clientID:"555438780991-1dkcta2qaeejg2c960ef2o4vvbbnrft5.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/user/auth/google/callback"
    },
    function(accessToken,refreshToken, profile,done){
        User.findOne({email:profile.emails[0].value})
        .then(function(user){
            //console.log(profile)
            if(user){
                return done(null,user);
            }else{
                  User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                  }).
                  then(function(u){
                    return done(null,u);
                  })
                  .catch(function(err){
                    if(err){
                        console.log("error in creating user in passport google strategy",err);
                        return;
                    }
                    
                })
            }
        })
        .catch(function(err){
            if(err){
                console.log("error in google strategy passport",err);
                return;
            }
        })
    }
))


module.exports=passport;