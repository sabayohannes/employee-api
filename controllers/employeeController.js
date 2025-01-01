import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import multer from "multer"  
import path from 'path'
import Department from "../models/Department.js"
const storage=multer.diskStorage({
destination :(req , file ,cb)=>
{
    cb(null,"public/uploads")
},
 filename: (req , file , cb)=>{
    cb(null,Date.now() + path.extname(file.originalname))
 }
})
const upload=multer ({storage});

const addEmployee=async (req,res) =>{
    try{
  const {name,email,employeeId,dob,gender,maritalStatus,designation,department,salary,password,role} =req.body
console.log(req.body)
const user=await User.findOne({email})
    if(user){
return res.status(400).json({success:false ,error :"user already registered in employee"})
    }
    const hashPassword =await bcrypt.hash(password,10)
    const newUser= new User({
        name,
        email,
        password:hashPassword,
         role,
        profileImage:req.file? req.file.filename : ''
    })
    const saveduser=await newUser.save();


    const newEmployee= new Employee({
        userId:saveduser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,

    })
    await newEmployee.save()
   return res.status(200).json({success:true,message:"employee created successfuly"})
    }catch(error){
        
        return res.status(500).json({success:false,error:"server error in adding employee"})
    }
}
const getEmployees= async (req,res)=>{

    try{
const employees= await Employee.find().populate("userId").populate("department");
console.log("Fetched Employees:", employees); 
return res.status(200).json({success:true,employees})
    }
    catch(error){
return res.status(500).json({success:false,error:"get employees server error"})
    }
}

const getOneEmployees= async (req,res)=>{
const { id }=req.params;
    try{
        let employee
        employee = await Employee.findById({_id: id}).populate("userId").populate("department");
        if(!employee){
            employee = await Employee.findOne({userId: id}).populate("userId",{ password:0}).populate("department");
        }

return res.status(200).json({success:true,employee})
    }
    catch(error){
return res.status(500).json({success:false,error:"get employees server error"})
    }
}

const updateEmployee= async(req,res) =>{
    
try{
    console.log("Incoming update request:", req.body);
    const {id}=req.params;
    const {name, 
          maritalStatus,
          designation,
          department,
          salary
        } =req.body
const employee=await Employee.findById(id)
if(!employee){
    return res.status(400).json({success:false,error:"employee not found"}) 
}
const user=await User.findById(employee.userId)
if(!user){
    return res.status(400).json({success:false,error:"user not found"}) 
}
const updatedUser=await User.findByIdAndUpdate(employee.userId,{name});
const updatedemployee=await Employee.findByIdAndUpdate(id,{
    maritalStatus,
    designation,
    department,
    salary
});
if(!updatedUser || !updatedemployee){
    return res.status(400).json({success:false,error:"document not found"})
}
return res.status(200).json({success:true, message:" employee updated !!"})

}catch(error){

    return res.status(500).json({success:false,error:"put employee server error"})
}


}

const fetchemployeById=async (req,res)=>{
    const{id}=req.params;
    try{
        const employees=await Employee.find({department:id})
        return res.status(200).json({success:true,employees})
    }catch(error){

    return res.status(500).json({success:false,error:"get employee server error"})
}

}

export {addEmployee , upload , getEmployees , getOneEmployees,updateEmployee,fetchemployeById} 