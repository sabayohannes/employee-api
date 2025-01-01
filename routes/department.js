import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { addDepartment ,getDepartment,getOneDepartment,updateDepartment,deleteDepartment } from "../controllers/departmentController.js";



const router=express.Router();
 

router.post('/add',authMiddleware ,addDepartment)
router.get('/' ,getDepartment)
router.get('/:id' ,getOneDepartment)
router.put('/:id' ,updateDepartment)
router.delete('/:id' ,deleteDepartment)


export default router;


