import productModel from "../models/product.model.js";


export const stockOfVarient=async(productId,varientId)=>{
    const product = await productModel.findById(productId)

    if(!product) return 0

    // If product has variants, find the matching variant's stock
    if(Array.isArray(product.varients) && product.varients.length > 0){
        const variant = product.varients.find(v => v._id.toString() === String(varientId))
        return variant ? (variant.stock || 0) : 0
    }

    // Product has no variants — assume unlimited or fallback stock
    return Number.MAX_SAFE_INTEGER

}

