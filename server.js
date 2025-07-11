import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/db.js";
import cors from "cors"
import authRouter from "./routes/authRouter.js"
import taskRouter from "./routes/taskRouter.js"
import roleRouter from "./routes/roleRouter.js"


dotenv.config()
dbConnection()
const PORT=process.env.PORT || 8000;
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/auth",authRouter)
app.use("/api/tasks",taskRouter)
app.use("/api/roles",roleRouter)


app.listen(PORT,()=>{
    console.log(`server is running at port : ${PORT}`)
})