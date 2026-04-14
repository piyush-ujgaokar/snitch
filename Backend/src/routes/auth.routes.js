import Router from 'express'
import { validateLoginUser, validateRegisterUser } from '../middleware/auth.middleware.js';
import {register,login} from '../controllers/auth.controller.js'

const router=Router()


router.post('/register',validateRegisterUser,register)
router.post('/login',validateLoginUser,login)




export default router