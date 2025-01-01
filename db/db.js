import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase =async ()=>{
    try{
await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
console.log(err)
    }
}




export default connectToDatabase;
