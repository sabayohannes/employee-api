import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import {changePassword} from "../controllers/settingController.js"



const router=express.Router();
 

router.put('/change-Password',authMiddleware,changePassword)



export default router;  


 