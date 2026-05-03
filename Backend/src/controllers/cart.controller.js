import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import {stockOfVarient} from "../dow/product.dow.js";
import mongoose from "mongoose";
import {createOrder} from "../services/payment.service.js"
import { getCartDetail } from "../dow/cart.dow.js";
import paymentModel from "../models/payment.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { config } from "../config/config.js";


export const addToCart=async (req,res)=>{

    const {productId,varientId}=req.params
    const {quantity}=req.body

    const qty = quantity || 1

    const product = await productModel.findById(productId)

    if(!product){
        return res.status(404).json({
            message: "Product not found",
            success: false
        })
    }

    // Determine if a real variant was provided. If variantId equals productId
    // or no variantId maps to a variant, treat as "no variant selected" and
    // add the main product (use product.price and a fallback stock).
    const hasVariants = Array.isArray(product.varients) && product.varients.length > 0
    let matchedVariant = null

    if (hasVariants) {
        matchedVariant = product.varients.find(v => v._id.toString() === String(varientId)) || null
        // If a variantId was provided and it's not the productId and not found, return 404
        if (!matchedVariant && String(varientId) !== String(productId)) {
            return res.status(404).json({
                message: "Product variant not found",
                success: false
            })
        }
    }

    // Resolve stock: if matchedVariant use its stock, otherwise fallback to large number
    const stock = matchedVariant ? (matchedVariant.stock || 0) : Number.MAX_SAFE_INTEGER

    const cart=(await cartModel.findOne({user:req.user._id})) || 
    await cartModel.create({user:req.user._id})



    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && String(item.varient) === String(matchedVariant ? matchedVariant._id : null) && String(varientId) === String(matchedVariant ? matchedVariant._id : productId))

    if(isProductAlreadyInCart){
        const existing = cart.items.find(item => item.product.toString() === productId && String(item.varient) === String(matchedVariant ? matchedVariant._id : null) && String(varientId) === String(matchedVariant ? matchedVariant._id : productId))
        const quantityInCart = existing.quantity
        if(quantityInCart + qty > stock){
            return res.status(400).json({
                message: `Only ${stock} items left in stock. And you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, items: { $elemMatch: { product: productId, varient: matchedVariant ? matchedVariant._id : null } } },
            { $inc: { "items.$.quantity": qty } },
            { new: true }
        )

        return res.status(200).json({
            message: "Cart updated successfully",
            success: true
        })
    }

    if(qty > stock){
        return res.status(400).json({
            message: `Only ${stock} items left in stock`,
            success: false
        })
    }

    cart.items.push({
        product: productId,
        varient: matchedVariant ? matchedVariant._id : null,
        quantity: qty,
        price: matchedVariant ? matchedVariant.price || product.price : product.price,
    })

    await cart.save()

    return res.status(200).json({
        message:"Product added to cart successfully",
        success:true,
        cart
    })

}


export const getCart=async(req,res)=>{
    const user=req.user

    let cart=await getCartDetail(user._id)

    if(!cart){
        cart=await cartModel.create({user:user._id})
    }

    return res.status(200).json({
        message:"Cart fetched successfully",
        success:true,
        cart
    })


}

export const incrementCartItemQuantity=async(req,res)=>{
        const {productId,varientId}=req.params

        // Normalize varientId: treat 'null', 'undefined', or productId as no-variant (null)
        const normalizeVarient = (vid, pid) => {
            if(!vid) return null
            if(String(vid) === String(pid)) return null
            if(String(vid).toLowerCase() === 'null' || String(vid).toLowerCase() === 'undefined') return null
            return vid
        }

        const normVarId = normalizeVarient(varientId, productId)

        const product = await productModel.findById(productId)

        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        // If product has variants, ensure provided variant exists (unless normVarId is null)
        if(Array.isArray(product.varients) && product.varients.length > 0 && normVarId){
            const variantExists = product.varients.some(v => v._id.toString() === String(normVarId))
            if(!variantExists){
                return res.status(404).json({
                    message: "Product variant not found",
                    success: false
                })
            }
        }

        const cart=await cartModel.findOne({user:req.user._id})

        if(!cart){
            return res.status(404).json({
                message:"Cart not found",
                success:false
            })
        }

        // Resolve stock: only call stockOfVarient when there's a real variant
        const stock = normVarId ? await stockOfVarient(productId, normVarId) : Number.MAX_SAFE_INTEGER

        const itemInCart = cart.items.find(item => {
            const itemVar = item.varient ? item.varient.toString() : null
            const compareVar = normVarId ? String(normVarId) : null
            return item.product.toString() === productId && itemVar === compareVar
        })

        const itemQuantityInCart = itemInCart?.quantity || 0

        if(itemQuantityInCart + 1 > stock){
            return res.status(400).json({
                message:`Only ${stock} items left in stock. And you already have ${itemQuantityInCart} items in your cart`,
                success:false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, items: { $elemMatch: { product: productId, varient: normVarId || null } } },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        )

        return res.status(200).json({
            message:"Cart Item Quantity Increment successfully",
            success:true
        })



}

export const decrementCartItemQuantity=async(req,res)=>{
    const {productId,varientId}=req.params

    // Normalize variant id like in other handlers
    const normalizeVarient = (vid, pid) => {
        if(!vid) return null
        if(String(vid) === String(pid)) return null
        if(String(vid).toLowerCase() === 'null' || String(vid).toLowerCase() === 'undefined') return null
        return vid
    }

    const normVarId = normalizeVarient(varientId, productId)

    const cart = await cartModel.findOne({ user: req.user._id })

    if(!cart){
        return res.status(404).json({
            message:"Cart not found",
            success:false
        })
    }

    const itemInCart = cart.items.find(item => {
        const itemVar = item.varient ? item.varient.toString() : null
        const compareVar = normVarId ? String(normVarId) : null
        return item.product.toString() === productId && itemVar === compareVar
    })

    if(!itemInCart){
        return res.status(404).json({
            message:"Item not found in cart",
            success:false
        })
    }

    if(itemInCart.quantity===1){
        cart.items = cart.items.filter(item => {
            const itemVar = item.varient ? item.varient.toString() : null
            const compareVar = normVarId ? String(normVarId) : null
            return !(item.product.toString() === productId && itemVar === compareVar)
        })
    }

    const stock = normVarId ? await stockOfVarient(productId, normVarId) : Number.MAX_SAFE_INTEGER

    if(itemInCart.quantity-1 > stock){
        return res.status(400).json({
            message:`Only ${stock} items left in stock. And you already have ${itemInCart.quantity} items in your cart`,
            success:false
        })
    }

    await cartModel.findOneAndUpdate(
        { user: req.user._id, items: { $elemMatch: { product: productId, varient: normVarId || null } } },
        { $inc: { "items.$.quantity": -1 } },
        { new: true }
    )

    return res.status(200).json({
        message:"Cart Item Quantity Decrement successfully",
        success:true
    })
}

export const removeCartItem=async(req,res)=>{
    const {productId,varientId}=req.params
    const normalizeVarient = (vid, pid) => {
        if(!vid) return null
        if(String(vid) === String(pid)) return null
        if(String(vid).toLowerCase() === 'null' || String(vid).toLowerCase() === 'undefined') return null
        return vid
    }

    const normVarId = normalizeVarient(varientId, productId)

    const cart=await cartModel.findOne({user:req.user._id})

    if(!cart){
        return res.status(404).json({
            message:"Cart not found",
            success:false
        })
    }

    const itemInCart = cart.items.find(item => {
        const itemVar = item.varient ? item.varient.toString() : null
        const compareVar = normVarId ? String(normVarId) : null
        return item.product.toString() === productId && itemVar === compareVar
    })

    if(!itemInCart){
        return res.status(404).json({
            message:"Item not found in cart",
            success:false
        })
    }

    cart.items = cart.items.filter(item => {
        const itemVar = item.varient ? item.varient.toString() : null
        const compareVar = normVarId ? String(normVarId) : null
        return !(item.product.toString() === productId && itemVar === compareVar)
    })

    await cart.save()
    
    return res.status(200).json({
        message:"Cart Item removed successfully",
        success:true
    })
}

export const createOrderController=async(req,res)=>{

    const cart=await getCartDetail(req.user._id)

    if(!cart){
        return res.status(404).json({
            message:"Cart is Empty",
            success:false
        })
    }

    const order=await createOrder({amount:cart.totalPrice, currency:cart.currency || "INR"})

    await paymentModel.create({
        user:req.user._id,
        razorpay:{
            orderId:order.id,
        },
        price:{
            amount:cart.totalPrice,
            currency:cart.currency
        },
        orderItems: cart.items.map(item => {
            const variant = item.product?.varients?.length > 0 ? item.product.varients[0] : null;
            return {
                product:{
                    productId: item.product?._id,
                    varientId: item.varient,
                    title: item.product?.title,
                    description: item.product?.description,
                    quantity: item.quantity,
                    price: {
                        amount: variant ? variant.price?.amount : item.product?.price?.amount,
                        currency: variant ? variant.price?.currency : (item.product?.price?.currency || cart.currency || "INR")
                    },
                    images: variant && variant.images?.length > 0 ? variant.images : item.product?.images,
                    attributes: variant ? variant.attributes : null
                }
            };
        })
     })

    return res.status(200).json({
        message:"Order created successfully",
        success:true,
        order
    })
}

export const verifyOrderController=async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body

    const payment=await paymentModel.findOne({
        "razorpay.orderId":razorpay_order_id,
         status:"pending"
    })

    if(!payment){
        return res.status(404).json({
            message:"Payment not found",
            success:false
        })
    }

    const isPaymentValid = validatePaymentVerification(
        {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
        },
        razorpay_signature,
        config.RAZORPAY_KEY_SECRET
    );

    if (!isPaymentValid) {
        payment.status = "failed";
        await payment.save();

        return res.status(400).json({
            message: "Invalid Payment",
            success: false
        });
    }

    // mark paid and save
    payment.status = "paid";
    payment.razorpay.paymentId = razorpay_payment_id;
    payment.razorpay.signature = razorpay_signature;

    await payment.save();

    return res.status(200).json({
        message: "Payment verified successfully",
        success: true
    });
};

export const getPaymentDetailsController = async (req, res) => {
    const { orderId } = req.params;

    const payment = await paymentModel.findOne({
        "razorpay.orderId": orderId,
        user: req.user._id
    }).populate("user", "-password");

    if (!payment) {
        return res.status(404).json({
            message: "Order not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "Order details fetched successfully",
        success: true,
        order: payment
    });
};

