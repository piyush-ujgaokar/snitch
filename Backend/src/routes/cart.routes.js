import {Router} from "express";
import { authuser } from "../middlewares/auth.middleware.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { addToCart, getCart } from "../controllers/cart.controller.js";





const router=Router()

router.post('/add/:productId/:varientId',authuser,addToCartValidator,addToCart)
router.get('/',authuser,getCart)

export default router