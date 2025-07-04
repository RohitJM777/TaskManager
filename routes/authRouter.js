import express from "express";
import { login, register } from "../controllers/authController.js";
import { authorization, protect } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/myProfile",protect,(req,res)=>{
    res.status(200).json({data:req.user})
})
router.get("/admin",protect,authorization('admin'),(req,res)=>{
    res.status(200).json({message:"admin content"})
})

export default router;