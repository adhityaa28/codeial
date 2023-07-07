const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User=require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
         User.findOne({email:email}).then(function(user){
            if(!user|| user.password!= password){
                req.flash('error','Invalid Username/Password')
                console.log("invalid Username/Password");
                return done(null,false);
            }

            return done(null,user);
         }).catch(function(err){
            if(err){
                req.flash('error',err)
                console.log("error in finding the user--> Passport ");
                return done(err);
            }
         })
    }
));


//  serialzing the user to decide the key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id)
})
// deserialzing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id).then(function(user){
        return done(null,user);
    }).catch(function(err){
        console.log("error in finding the user--> Passport ");
        return done(err);
    })
})


passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport; 