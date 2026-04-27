import {param,body,validationResult} from "express-validator"

const validateRequest=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}

export const addToCartValidator=[
    param("productId").isMongoId().withMessage("Invalid product ID"),
    // Accept a valid mongo id, or the literal 'null'/'undefined' to indicate no variant
    param("varientId").custom(value => {
        if (value === undefined || value === null) return false // param must exist in route
        const v = String(value)
        if (v === 'null' || v === 'undefined') return true
        return /^[0-9a-fA-F]{24}$/.test(v)
    }).withMessage("Invalid varient ID"),
    body("quantity").optional().isInt({min:1}).withMessage("Quantity must be at least 1"),
    validateRequest
]

export const validateIncrementCartQuantity=[
    param("productId").isMongoId().withMessage("Invalid product ID"),
    // variant id may be omitted or be 'null' to indicate no-variant
    param("varientId").optional().custom(value => {
        if (value === undefined || value === null) return true
        const v = String(value)
        if (v === 'null' || v === 'undefined') return true
        return /^[0-9a-fA-F]{24}$/.test(v)
    }).withMessage("Invalid varient ID"),
    validateRequest
]