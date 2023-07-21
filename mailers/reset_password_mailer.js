const nodeMailer = require('../config/nodemailer');

module.exports.resetPassword = function(accessToken,email){
    console.log(accessToken.user,email)
    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");
    nodeMailer.transporter.sendMail({
        from: 'reachout.connectvirtual@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Codeial : Reset Password", // Subject line
        html: htmlString // html body
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}