import foodmodel from "../models/foodModels.js";

import fs from 'fs';

//add food items

const addFood = async (req,res)=>{
    let imagefilename =`${req.file.filename}`;
    console.log("File received:", req.file);
    const food = new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:imagefilename
    })
    try{
        await food.save();
        res.json({success:true,message:"food added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})

    }
}

//all food list
const listfood = async (req,res)=>{
    try{
        const foods= await foodmodel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error); 
        res.json({success:false,message:"error"})

    }
}

//remove food item
const removefood = async (req,res)=>{
    try{
        const food= await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})

    }
}   

export {addFood,listfood,removefood}

//create the routes in the routes