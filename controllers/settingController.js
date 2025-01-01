import User from "../models/User.js";
import bcrypt from "bcrypt"

const changePassword=async(req,res)=>{

try{
    const {userId,oldPassword,newPassword}=req.body;
    const user=await User.findById(userId )
    
    
if(!user){
    return res.status(404).json({success:false,error:"user not found error"})
}
const isMatch=  await bcrypt.compare(oldPassword,user.password)
if(!isMatch){
    return res.status(404).json({success:false,error:"wrong password error"})

}
const hashPassword= await bcrypt.hash(newPassword,10);
const newUser=await User.findByIdAndUpdate(userId,{password:hashPassword})
return res.status(200).json({success:true})
}catch(error){
    console.error("Error occurred during password change:", error); 
    return res.status(500).json({success:false,error:"setting error"})
}
}
export {changePassword}