const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=function(req,res){
    

    Post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }

    }).then(function(p){
        console.log('api')
        return res.json(200,{
            
            message: "list of post",
            posts:p
        })
    })
    
}


module.exports.destroy=function(req,res){
    try {
        Post.findById(req.params.id).then(function(post){
           if(post.user==req.user.id){
                post.deleteOne() ;

    
                Comment.deleteMany({post:req.params.id}).then(function(){
                    
                    
                    return res.json(200,{
                        message:"post and comments deleted successfully"
                    })
                }).catch(function(err){
                     
                })
            }else{
                return res.json(401,{
                    message:"you cannot delete this post"
                });
            }
        })
        
    } catch (error) {
       
        return res.json(500,{
            message:"internal server error"
        })
        
    }
    
}