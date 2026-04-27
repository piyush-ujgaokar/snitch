import {Router} from "express";
import { authuser } from "../middlewares/auth.middleware.js";
import { addToCartValidator,validateIncrementCartQuantity } from "../validators/cart.validator.js";
import { addToCart, decrementCartItemQuantity, getCart, incrementCartItemQuantity, removeCartItem } from "../controllers/cart.controller.js";





const router=Router()

router.post('/add/:productId/:varientId',authuser,addToCartValidator,addToCart)
router.get('/',authuser,getCart)

router.patch('/quantity/increment/:productId/:varientId',authuser,validateIncrementCartQuantity,incrementCartItemQuantity)
router.patch('/quantity/decrement/:productId/:varientId',authuser,validateIncrementCartQuantity,decrementCartItemQuantity)

router.delete('/remove/:productId/:varientId',authuser,validateIncrementCartQuantity,removeCartItem)


export default router