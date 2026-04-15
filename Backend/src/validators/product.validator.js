import {body,validationResult} from 'express-validator';


const validateRequest=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()[0].msg})
    }
    next()
}

export const createProductValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('priceAmount').isNumeric().withMessage(' price amount must be a number'),
    body('priceCurrency').notEmpty().withMessage('Prioce currency is required'),
    validateRequest
];