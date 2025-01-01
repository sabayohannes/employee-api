import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
import Department from "../models/Department.js";


const getSummary=async (req,res) =>{

    try{
        const totalEmployees=await Employee.countDocuments();
        const totalDepartment=await Department.countDocuments();
        const totlaSalaries=await Employee.aggregate([
            {$group:{_id:null,totalSalary:{$sum:'$salary'}}}
        ])
  
        const employeeAppliedForLeave=await Leave.distinct('employeeId')
        console.log(employeeAppliedForLeave)
const leaveStatus=await Leave.aggregate([
    {$group:{
        _id:'$status',
        count:{ $sum: 1}
    }}
])

const leaveSummary=
{
    appliedFor:employeeAppliedForLeave.length,
    Approved:leaveStatus.find(item=>item._id=="Approved")?.count||0,
    Rejected:leaveStatus.find(item=>item._id=="Rejected")?.count||0,
    Pending:leaveStatus.find(item=>item._id=="Pending")?.count||0,
}

return res.status(200).json({success:true,
    totalEmployees,
    totalDepartment,
    totalsalary:totlaSalaries[0]?.totalSalary || 0,
    leaveSummary


})
    }
    catch(error){
        console.log(error)
return res.status(500).json({success:false,error:"dashboard summary error"})
    }



}
export {getSummary};