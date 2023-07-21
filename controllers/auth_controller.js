const User = require('../models/user');
const AccessToken = require('../models/accessToken');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const crypto = require('crypto');
const { access } = require('fs');
const { localsName } = require('ejs');

module.exports.auth = function(request , response){

    return response.render('verify_email' , {
        title: "Codeial | Verify",
    });
}

module.exports.verifyEmail =  function(request , response){
    //User.findOne({email : request.body.email});
    User.findOne({email : request.body.email}).then(async function(user){
        if(user){
            console.log(user)
            let token = await crypto.randomBytes(20).toString("hex");
            let accessToken = await AccessToken.create({
               user : user,
               token :  token,
               isValid : true
            });
            console.log("accessToken",accessToken)
    
            resetPasswordMailer.resetPassword(accessToken,user.email);
    
            return response.render('account_verified' , {
                title: "Codeial | Account Verified",
            });
        }else{
            request.flash("error", "Account does not exist with this email");
            return response.redirect('back');
        }
    }).catch(function(err){
        request.flash("error", "Account does not exist with this email");
        return response.redirect('back');
    })
}

module.exports.resetPassword =  function(request , response){
    AccessToken.findOne({token : request.query.accessToken})
    .then(function(accessToken){
        if(accessToken){
            if(accessToken.isValid){
                return response.render('reset_password' , {
                    title : 'Codeial | Reset Password',
                    accessToken : accessToken.token
                })
            }
        }else{
            request.flash('error' , 'Token is Expired ! Pls regenerate it.');
            return response.redirect('/auth');
        }
    }).catch(function(err){
        request.flash('error' , 'Token is Expired ! Pls regenerate it.');
        return response.redirect('/auth');
    })
}
module.exports.reset = async function(request , response){
    AccessToken.findOne({token : request.query.accessToken})
    .then(function(accessToken){
        if(accessToken){
            console.log('here');
            if(accessToken.isValid){
                accessToken.isValid = false;
                if(request.body.password == request.body.confirm_password){
                    User.findById(accessToken.user)
                    .then(function(user){
                        if(user){
                            user.password=request.body.password;
                            accessToken.save();
                            user.save();
                            console.log('Password changed' , user )
                        }
                        request.flash('success' , 'Password Changed');
                        return response.redirect('/user/sign-in');
                    })
                }else{
                    request.flash('error' , 'Password didnt matched');
                    return response.redirect('back');
                }
            }
        }else{
            request.flash('error' , 'Token is Expired ! Pls regenerate it.');
            return response.redirect('/auth');
        }
       
    }).catch(function(err){
        console.log('reset error',err);
    })
}