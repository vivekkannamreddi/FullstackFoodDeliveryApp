import foodmodel from "../models/foodModels.js";

import fs from 'fs';

//add food items

const addFood = async (req,res)=>{
    let imagefilename =`${req.file.filename}`;
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

export {addFood}

//create the routes in the routes