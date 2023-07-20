const Post = require('../models/post')
const User=require('../models/user')
module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',33);

    Post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }, populate: {
            path: 'likes'
        }

    }).populate('likes')
    .then(function(post){
        User.find({}).then(function(users){
            return res.render('home',{
                title:'home',
                posts: post,
                all_users:users
            });
        })
        
    })

    
}