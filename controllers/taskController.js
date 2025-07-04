import Task from "../models/tasks.js";

export const createTask=async(req,res)=>{
    const {task}=req.body;
    if(!task){
        return res.status(400).json({message:"bad request : task is required"})
    }
    try{
        const newTask=await Task.create(req.body)
        res.status(201).json({message:"Task created successfully",
            task:newTask
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}

export const getTask=async(req,res)=>{
    try{
        const Tasks=await Task.find({assignTo:req.user.id});
        res.status(200).json({
            message:"Task retreived successful",
            tasksList:Tasks
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }
}

export const updateTask=async(req,res)=>{
    const {id}=req.body;
    if(!id){
        res.status(400).json({
            message:"bad request : missing projet id"
        })
    }
    try{
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        res.status(201).json({
            message:"Task modified",
            task:updatedTask
        })
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"})
    }

}


export const deleteTask=async(req,res)=>{
    const {id}=req.body;
    try{
        const deletedTask=await Task.findByIdAndDelete(id)
        res.status(200).json({message:"task deleted successfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}