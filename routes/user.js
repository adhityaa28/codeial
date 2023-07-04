const express = require('express');
const router= express.Router();
const passport=require('passport')
const usercontroller=require('../controllers/user_controller');
router.get('/profile',passport.checkAuthentication, usercontroller.profile);

router.get('/sign-in',usercontroller.signin);
router.get('/sign-up',usercontroller.signup);

router.post('/create',usercontroller.create)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),usercontroller.createSession)

module.exports=router;

router.get('/sign-out',usercontroller.destroySession);