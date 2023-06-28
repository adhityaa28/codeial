const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to the database'));

db.once('open',function(){
    console.log("successfuly connected to database");
})

module.exports=db;