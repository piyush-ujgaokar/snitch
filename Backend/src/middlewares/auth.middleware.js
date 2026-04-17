import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import {config} from '../config/config.js'



export const authuser=async (req,res,next)=>{
        const token=req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }   

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);

            const user=await userModel.findById(decoded.id)
            // console.log("User data:-",user)
            if(!user){
                return res.status(401).json({ message: "Unauthorized: User not found" });
            }

            req.user=user
            next(); 
        }catch (error) {
            console.log("Error in authentication middleware:", error);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }


}


export const authenticateSeller = async(req, res, next) => {

    const token=req.cookies.token

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user=await userModel.findById(decoded.id)
        if(!user){
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
        if(user.role!=="seller"){
            return res.status(403).json({ message: "Forbidden: Access is denied" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authentication middleware:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });

}
}