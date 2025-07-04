import jwt from "jsonwebtoken"
import User from "../models/users.js"

const generateToken=(user)=>{
    return jwt.sign({id:user.id,email:user.email,role:user.role,name:user.name},process.env.JWT_SECRET,{expiresIn:"1d"})
}

export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        res.status(400).json({message:"bad request : missing parameters"})
    }
    try{
        const userExists=await User.findOne({email});

        if(userExists){
            res.status(400).json({message :"User already exists"})
        }else{
            const newUser=await User.create({name,email,password})
            res.status(201).json({
                token:generateToken(newUser),
                user:{id:newUser.id,email:newUser.email,role:newUser.role}
            })
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).json({message:"Bad request : missing paramters"})
    }
    try{
        const userExists=await User.findOne({email});
        if(!userExists){
            res.status(400).json({message:"User not found"})
        }

        if(!await userExists.checkPassword(password)){
            res.status(400).json({message:"Invalid password"})
        }
        res.status(200).json({
            token:generateToken(userExists),
            user:{id:userExists.id,email:userExists.email,role:userExists.role,name:userExists.name}
        })

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}