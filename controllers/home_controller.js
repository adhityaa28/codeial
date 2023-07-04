const Post = require('../models/post')

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',33);

    Post.find({}).populate('user').then(function(post){
        return res.render('home',{
            title:'home',
            posts: post
        });
    })

    
}