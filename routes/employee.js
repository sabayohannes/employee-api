import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { addEmployee,upload, getEmployees,getOneEmployees,updateEmployee,fetchemployeById} from "../controllers/employeeController.js";



const router=express.Router();
 

router.post('/add',authMiddleware,upload.single('image'),addEmployee)
router.get('/',getEmployees)
router.get('/:id' ,getOneEmployees)
router.put('/:id' ,updateEmployee)
router.get('/department/:id' ,authMiddleware,fetchemployeById)
//router.delete('/:id' ,deleteDepartment)


export default router;


