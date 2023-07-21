const express = require('express');

const router= express.Router();
const homecontroller=require('../controllers/home_controller')

console.log('router loaded');

router.get('/',homecontroller.home);
router.use('/user',require('./user'))
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'))
router.use('/api',require('./api'))
router.use("/auth" , require("./auth"));

module.exports=router;