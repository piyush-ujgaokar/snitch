import { uploadImage } from '../services/storage.service.js';
import productModel from '../models/product.model.js';

export const createProduct=async(req,res)=>{

    const {title,description,priceCurrency,priceAmount}=req.body
    const seller=req.user


    const images=await Promise.all(req.files.map(async(file)=>{
        return await uploadImage({
            buffer:file.buffer,
            fileName:file.originalname
        })
    }))


    const product=await productModel.create({
        title,
        description,
        seller:seller.id,
        price:{
            amount:priceAmount,
            currency:priceCurrency || "INR"
        },
        images
    })

    res.status(201).json({
        message:"Product created successfully",
        success:true,
        product
    })

}

export const getSellerProducts=async(req,res)=>{

    const seller=req.user
    const products=await productModel.find({seller:seller.id})

    res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })
}


