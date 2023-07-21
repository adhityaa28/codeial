const Post = require('../models/post')
const User=require('../models/user')
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',33);

    Post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comments',
         populate: {
            path: 'likes'
        },populate:{
            path:'user',
        }

    }).populate('likes')
    .then(function(post){
        User.find({}).then(function(users){
            //console.log(post[0].comments[0])
            return res.render('home',{
                title:'home',
                posts: post,
                all_users:users
            });
        })
        
    })

    
}