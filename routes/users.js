import express from "express";
import user from '../controllers/user.js'


var router = express.Router();
/* GET users listing. */
router.post('/signup',user.signup);
router.post('/login',user.login)
router.post('/forgotPassword',user.forgotPassword)
router.post('/changePassword',user.changePassword)

// router.post('/login/users',user.onGetAllUser)

export default router;
