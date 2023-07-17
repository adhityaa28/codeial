const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
   let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from:"reachout.connectvirtual@gmail.com",
        to:comment.user.email,
        subject:"new comment published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("err in sending mail",err);
            return;
        }

        console.log("message sent",info);
        return;
    })

}