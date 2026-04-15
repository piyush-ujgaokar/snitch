import Router from 'express'
import { validateLoginUser, validateRegisterUser } from '../validators/auth.middleware.js';
import {register,login, googleCallback} from '../controllers/auth.controller.js'
import passport from 'passport';
import {config} from '../config/config.js'

const router=Router()


router.post('/register',validateRegisterUser,register)
router.post('/login',validateLoginUser,login)
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',
    passport.authenticate(
        'google',
        {
            session:false,
            failureRedirect:config.Node_env==='development' ? 'http://localhost:5173/login' : '/login'
        }
    ),googleCallback)


export default router