const User=require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id).then(function(user){
        return res.render('profile',{
            title:'profile',
            profile_user:user
        });
    })

    
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        
        User.findByIdAndUpdate(req.params.id,req.body).then(function(user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized')
    }
}

module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_sign_in',{
        title:'sign in'
    });
}


module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_up',{
        title:'sign up'
    });
}


module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log('password not matching')
        return res.redirect('back')
    }
    
    User.findOne({email:req.body.email}).then(function(a){
        if(!a){
            User.create(req.body).then(function(b){
                console.log('Successfully created the user',b);
            }).catch(function(err){
                console.log('error in creating the user',err);
                return
            })
            return res.redirect('/user/sign-in');
        }
        else{
            console.log('user already present');
            return res.redirect('back')
        }
    })
}


module.exports.createSession=function(req,res){
    req.flash('success','logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err,'err');
            
        }
        req.flash('success','you have logged out successfully');

    return res.redirect('/');
    });
    
}