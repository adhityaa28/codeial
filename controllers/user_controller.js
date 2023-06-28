const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('profile',{
        title:'profile'
    });
}

module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:'sign in'
    });
}


module.exports.signup=function(req,res){
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
    
}