const Like=require('../models/like');
const Post = require('../models/post');
const Comment=require('../models/comment');


module.exports.toggleLike= async function(req,res){
    
    try {
       
        let likeable;
        let deleted=false;

        if(req.query.type=="Post"){
            likeable= await Post.findById(req.query.id).populate('likes');
        }else{
            likeable= await Comment.findById(req.query.id).populate('likes');
        }


        let existingLike=await Like.findOne({
            likeable: req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })


        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted=true;
        }else{
            let newlike=await Like.create({
                user:req.user._id,
                likeable: req.query.id,
                onModel:req.query.type
            })

            likeable.likes.push(newlike._id);
            likeable.save();
        }
        
            
            // return res.status(200).json({
            //     data:{
            //         deleted:deleted,
            //     },
            //     message:"Request successful"
            // })
            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        deleted:deleted
                    },
                    message: 'Post created'
                })
            }
        

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}