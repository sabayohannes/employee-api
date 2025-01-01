  import User from './models/User.js'
  import bcrypt from 'bcrypt'
  import connectionToDatabase from './db/db.js'
  
  
  const userRegister =async()=>{
 await connectionToDatabase()

try{
    const hashPassword= await bcrypt.hash("admin",10)
    const newUser=new User({
        name:"Admin",
        email:"admin@gmail.com".trim(),
        password:hashPassword,
        role:"admin",

    })
    await newUser.save();

  
}catch(err)
{
    console.log(err)
    return res.status(500).json({ success: false, error: "Server Error" });
}
  }

  userRegister();