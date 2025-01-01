import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import {addSalary} from "../controllers/salaryController.js"
import {getSalary} from "../controllers/salaryController.js"


const router=express.Router();
 

router.post('/add',authMiddleware,addSalary)
router.get('/:id/:role',authMiddleware,getSalary)



export default router;  


 