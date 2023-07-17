const express = require('express');
const router= express.Router();
const passport=require('passport')
const usercontroller=require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication, usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication, usercontroller.update);

router.get('/sign-in',usercontroller.signin);
router.get('/sign-up',usercontroller.signup);

router.post('/create',usercontroller.create)

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
),usercontroller.createSession)



router.get('/sign-out',usercontroller.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usercontroller.createSession)

module.exports=router;