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

export const getAllProducts=async(req,res)=>{

    const products=await productModel.find()

    res.status(200).json({
        message:"Products fetched successfully",
        success:true,
        products
    })  
}

export const getProductDetails=async (req,res)=>{
    const {id}=req.params

    const product=await productModel.findById(id)

    if(!product){
        return res.status(404).json({
            message:"Product not Found",
            success:false
        })
    }

    return res.status(200).json({
        message:"Product detal Fetched Successfully",
        success:true,
        product
    })



}

export const addProductVarient=async(req,res)=>{

    const productId=req.params.productId

    const product=await productModel.findOne({
        _id:productId,
        seller:req.user._id
    })

    if(!product){
        return res.status(404).json({
            message:"Product not Found",
            success:false
        })
    }

    console.log(product.varients)

    const files=req.files
    const images=[]
    if(files || files.length !=0){
     (  await Promise.all(files.map(async(file)=>{
            const image=await uploadImage({
                buffer:file.buffer,
                fileName:file.originalname
            })
            return image
        }))).map((image)=>{
            images.push(image)
        })
    }

    const price=req.body.priceAmount
    const stock=req.body.stock
    const attributes=JSON.parse(req.body.attributes || "{}")

   product.varients.push({
    images,
    price:{
         amount:price || product.price.amount,
         currency:req.body.priceCurrency || product.price.currency
   },
   stock,
   attributes
})

    await product.save()

    return res.status(200).json({
        message:"Product Varient added successfully",
        success:true,
        product
    })

}

