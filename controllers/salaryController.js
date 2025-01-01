import Salary from "../models/Salary.js"
import Employee from "../models/Employee.js"


const addSalary= async (req,res) =>{

    try{
const {employeeId,basicSalary,allowances,deductions,payDate}=req.body;


const totalSalary= parseInt(basicSalary) + parseInt(allowances) -parseInt(deductions)

const newSalary= new Salary({
    employeeId,
    basicSalary,
    allowances,
    deductions,
    netSalary:totalSalary,
    payDate,
}) 
await newSalary.save()
return res.status(200).json({success:true })
    }
    catch(error){
        console.error("Error in addSalary controller:", error);
return res.status(500).json({success:false,error:"salary  add server error "})
    } 
}
const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    let salary;

    if (role === "admin") {
      salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
    } else {
      const employee = await Employee.findOne({ userId: id });

      salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
      

    }

    if (!salary || salary.length === 0) {
      return res.status(404).json({ success: false, message: 'No salary records found' });
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error('Error fetching salary history:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};



export {addSalary,getSalary};






