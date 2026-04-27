import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import {stockOfVarient} from "../dow/product.dow.js";

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

    // If product has variants, ensure provided variant exists
    if(Array.isArray(product.varients) && product.varients.length > 0){
        const variantExists = product.varients.some(v => v._id.toString() === String(varientId))
        if(!variantExists){
            return res.status(404).json({
                message: "Product variant not found",
                success: false
            })
        }
    }

    const stock = await stockOfVarient(productId, varientId)

    const cart=(await cartModel.findOne({user:req.user._id})) || 
    await cartModel.create({user:req.user._id})



    const isProductAlreadyInCart = cart.items.some(item => item.product.toString() === productId && item.varient.toString() === String(varientId))

    if(isProductAlreadyInCart){
        const existing = cart.items.find(item => item.product.toString() === productId && item.varient.toString() === String(varientId))
        const quantityInCart = existing.quantity
        if(quantityInCart + qty > stock){
            return res.status(400).json({
                message: `Only ${stock} items left in stock. And you already have ${quantityInCart} items in your cart`,
                success: false
            })
        }

        await cartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": productId, "items.varient": varientId },
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
        varient: varientId,
        quantity: qty,
        price: product.price,
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

    let cart=await cartModel.findOne({user:user._id}).populate("items.product")

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

        const product = await productModel.findById(productId)

        if(!product){
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        // If product has variants, ensure variant exists
        if(Array.isArray(product.varients) && product.varients.length > 0){
            const variantExists = product.varients.some(v => v._id.toString() === String(varientId))
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

        const stock= await stockOfVarient(productId,varientId)

        const itemQuantityInCart=cart.items.find(item=>item.product.toString()===productId && item.varient.toString()===varientId)?.quantity || 0

        if(itemQuantityInCart+1>stock){
            return res.status(400).json({
                message:`Only ${stock} items left in stock. And you already have ${itemQuantityInCart} items in your cart`,
                success:false
            })
        }

        await cartModel.findOneAndUpdate(
            {user:req.user._id,"items.product":productId,"items.varient":varientId},
            { $inc: {"items.$.quantity": 1}},
            {new:true}
        )

        return res.status(200).json({
            message:"Cart Item Quantity Increment successfully",
            success:true
        })



}

export const decrementCartItemQuantity=async(req,res)=>{
    const {productId,varientId}=req.params

    const cart=await cartModel.findOne({user:req.user._id})

    if(!cart){
        return res.status(404).json({
            message:"Cart not found",
            success:false
        })
    }

    const itemInCart=cart.items.find(item=>item.product.toString()===productId && item.varient.toString()===varientId)

    if(!itemInCart){
        return res.status(404).json({
            message:"Item not found in cart",
            success:false
        })
    }

    if(itemInCart.quantity===1){
        cart.items=cart.items.filter(item=>!(item.product.toString()===productId && item.varient.toString()===varientId))
    }

    const stock=await stockOfVarient(productId,varientId)

    if(itemInCart.quantity-1>stock){
        return res.status(400).json({
            message:`Only ${stock} items left in stock. And you already have ${itemInCart.quantity} items in your cart`,
            success:false
        })
    }

    await cartModel.findOneAndUpdate(
        {user:req.user._id,"items.product":productId,"items.varient":varientId},
        { $inc: {"items.$.quantity": -1}},
        {new:true}
    )

    return res.status(200).json({
        message:"Cart Item Quantity Decrement successfully",
        success:true
    })
}

export const removeCartItem=async(req,res)=>{
    const {productId,varientId}=req.params

    const cart=await cartModel.findOne({user:req.user._id})

    if(!cart){
        return res.status(404).json({
            message:"Cart not found",
            success:false
        })
    }

    const itemInCart=cart.items.find(item=>item.product.toString()===productId && item.varient.toString()===varientId)

    if(!itemInCart){
        return res.status(404).json({
            message:"Item not found in cart",
            success:false
        })
    }

    cart.items=cart.items.filter(item=>!(item.product.toString()===productId && item.varient.toString()===varientId))

    await cart.save()
    
    return res.status(200).json({
        message:"Cart Item removed successfully",
        success:true
    })
}