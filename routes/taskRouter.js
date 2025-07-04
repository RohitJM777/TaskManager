import express from "express"
import { authorization, protect } from "../middleware/authMiddleware.js"
import { createTask, deleteTask, getTask, updateTask } from "../controllers/taskController.js"

const router=express.Router()

router.post("/createTask",protect,authorization('admin','manager'),createTask)
router.get("/getTask",protect,getTask)
router.put("/updateTask",protect,authorization('admin','manager'),updateTask)
router.delete("/deleteTask",protect,authorization('admin'),deleteTask)
export default router