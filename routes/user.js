const express = require('express');
const router= express.Router();
const usercontroller=require('../controllers/user_controller');
router.get('/profile', usercontroller.profile);

router.get('/sign-in',usercontroller.signin);
router.get('/sign-up',usercontroller.signup);

router.post('/create',usercontroller.create)

module.exports=router;