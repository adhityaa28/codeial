const Post = require('../models/post')
const Comment = require('../models/comment')
const Like=require('../models/like');
module.exports.create=function(req,res){
    try {
        //console.log('its user',req.user)
        Post.create({
            
            content: req.body.content,
            user:req.user._id
        }).then(async function(p){
            
           
           //p["name"] = req.user.name;
            //console.log(p)
            if(req.xhr){
                p= await p.populate('user', 'name');
                return res.status(200).json({
                    data:{
                        post:p
                    },
                    message: 'Post created'
                })
            }
            req.flash('success','post created successfully');
            return res.redirect('back');
        }).catch(function(err){
            if(err){ 
                req.flash('error','cannot creat post');
                console.log('error in creating the post',err)
                return res.redirect('back');
            }
        })
        
    } catch (error) {
        req.flash('error','cannot creat post');
        return res.redirect('back');
    }
    
}

module.exports.destroy=function(req,res){
    try {
        Post.findById(req.params.id).then( async function(post){
            if(post.user==req.user.id){

                await Like.deleteMany({likeable: post, onModel: 'Post'});
                await Like.deleteMany({_id: {$in: post.comments}});


                post.deleteOne() ;

    
                Comment.deleteMany({post:req.params.id}).then(function(){
                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                post_id:req.params.id
                            },
                            message:"post deleted "
                        })
                    }
                    req.flash('success','post deleted successfully');
                    return res.redirect('back')
                }).catch(function(err){
                    req.flash('error','cannot delete post');
                    return res.redirect('back')
                })
            }else{
                req.flash('error','cannot delete post');
                return res.redirect('back')
            }
        })
        
    } catch (error) {
        req.flash('error','cannot delete post');
        return res.redirect('back');
        
    }
    
}