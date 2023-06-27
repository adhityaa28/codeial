const express = require('express');
const app=express();
const port=8000; 

//for layouts
const expressLayout=require('express-ejs-layouts');
app.use(express.static('./assets'));

app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// for ejs
app.set('view engine','ejs');
app.set('views','./views')

app.use("/",require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`error in running on port ${port}`);
    }
    console.log(`server is running on port : ${port}`);
})