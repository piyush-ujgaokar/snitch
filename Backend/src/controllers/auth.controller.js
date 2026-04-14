import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";


async function sendTokenResponse(user,res,message){
    const token=jwt.sign({id:user._id},config.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(200).json({
        message,
        success:true,
        token,
        user:{  
            id:user._id,
            email:user.email,
            fullname:user.fullname,
            contact:user.contact,
            role:user.role
        }
    })
}



export const register=async(req,res)=>{
    const {email,contact,fullname,password,isSeller}=req.body

    try {

        const isUserAlreadyExist=await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
        if(isUserAlreadyExist){
            return res.status(400).json({message:"User already exist with this email and contact"})
        }


        const user=await userModel.create({
            email,
            contact,
            fullname,
            password,
            role:isSeller?"seller":"buyer"
        })

     await sendTokenResponse(user,res,"User registered successfully")


    } catch (error) {
        console.log("Error while registering:",error)
        res.status(500).json({ message: "Server error" });
    }

}

export const login=async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        } 

        const isPasswordMatch=await user.comparePassword(password)
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }

        await sendTokenResponse(user,res,"User logged in successfully")
    }catch (error) {
        console.log("Error while logging in:",error)
        res.status(500).json({ message: "Server error" });
    }
}