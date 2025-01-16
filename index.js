import express from 'express'
import cors from 'cors'
import authRoutes from "./routes/auth.js";
import connectToDatabase from './db/db.js';
import departmentRouter from './routes/department.js' 
import employeeRouter from "./routes/employee.js"
import salaryRouter from "./routes/salary.js"
import leaveRouter from "./routes/leave.js"
import settingRouter from "./routes/setting.js"
import dashboardRouter from "./routes/dashboard.js"

import {userRegister} from './userSeed.js'
connectToDatabase()


const app=express();
app.use(cors({
    origin:"https://employee-frontend-pearl.vercel.app",
    credentials:true
}));

app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth',authRoutes)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/dashboard',dashboardRouter)

export default (req, res) => app(req, res);

