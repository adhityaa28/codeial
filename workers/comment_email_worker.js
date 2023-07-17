const queue= require('../config/kue');

const commentsmailer=require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    console.log('emails worker is proccessing a job',job.data);

    commentsmailer.newComment(job.data);
    done();
})