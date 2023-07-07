const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    try {
        Post.findById(req.body.post).then(function(post){
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                }).then(function(comment){
                    post.comments.push(comment);
                    post.save();
                    req.flash('success','comment created successfully');
    
                    res.redirect('/');
                }).catch(function(err){
                    if(err){
                        console.log('can not create comment',err)
                        req.flash('error','cannot create comment');
                        return res.redirect('back')
                    }
                })
            }
        }).catch(function(err){
            if(err){
                console.log('can not find post',err)
                req.flash('error','cannot create comment');
                return res.redirect('back')
            }
        })
        
    } catch (error) {
        req.flash('error','cannot create comment');
        return res.redirect('back')
        
    }
    
}


module.exports.destroy=function(req,res){

    try {
        Comment.findById(req.params.id).then(function(comm){
            if(comm.user==req.user.id)
            {
                let postId=comm.post;
                comm.deleteOne();
    
                Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}).then(function(post){
                    req.flash('success','successfully deleted comment');
                    return res.redirect('back');
                })
            }else{
                req.flash('error','cannot delete comment');
                return res.redirect('back')
            }
        })
        
    } catch (error) {
        req.flash('error','cannot delete comment');
        return res.redirect('back')
        
    }
    
}