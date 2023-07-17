const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');


let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:"codeial"
}

passport.use(new JWTStrategy(opts, function(JWTPlayLoad,done){
    User.findById(JWTPlayLoad._id).then(function(user){
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }).catch(function(err){
        if(err){
            console.log("err in passport jwt",err)
        }
    })

}))

module.exports=passport; 