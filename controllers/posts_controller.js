const Post = require('../models/post')
const Comment = require('../models/comment')
module.exports.create=function(req,res){
    try {
        //console.log('its user',req.user)
        Post.create({
            
            content: req.body.content,
            user:req.user._id
        }).then(function(p){
            
           p.name=req.user.name;
           //p["name"] = req.user.name;
            //console.log(p)
            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        post:p,
                        name: req.user.name
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
        Post.findById(req.params.id).then(function(post){
            if(post.user==req.user.id){
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