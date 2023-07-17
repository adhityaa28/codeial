const User=require('../../../models/user');
const jwt = require('jsonwebtoken');
module.exports.createSession=function(req,res){
    try {
        User.findOne({email:req.body.email}).
        then(function(user){
            console.log(req.body.email);
            console.log(user)
            console.log(req.body.password)
            if(!user||user.password!=req.body.password){
                return res.json(422,{
                    message:"invalid username or password"
                })
            }

            return res.json(200,{
                message:"sign in successfull here is your token",
                data:{
                    token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
                }
            })
        })
    } catch (error) {
        return res.json(500,{
            message:"internal server error"
        })
    }
    
}