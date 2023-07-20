const Comment=require('../models/comment');
const Post=require('../models/post');
const Like=require('../models/like');
const commentmailer=require('../mailers/comments_mailer');
const queue= require('../config/kue');
const commentemailworker=require('../workers/comment_email_worker');



module.exports.create=function(req,res){
    try {
        Post.findById(req.body.post).then(function(post){
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                }).then( async function(comment){
                    post.comments.push(comment);
                    post.save();
                    comment = await comment.populate('user', 'name email');
                    //commentmailer.newComment(comment)
                    let job =queue.create('emails',comment).save(function(err){
                        if(err){
                            console.log('err in sending to the qeue',err);
                            return;
                        }
                        console.log("job enquied", job.id);
                    })
                    if (req.xhr){
                        
                        return res.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Post created!"
                        });
                    }
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
                
                Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}}).then(async function(post){
                    await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
                    
                    if (req.xhr){
                        return res.status(200).json({
                            data: {
                                comment_id: req.params.id
                            },
                            message: "Post deleted"
                        });
                    }
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