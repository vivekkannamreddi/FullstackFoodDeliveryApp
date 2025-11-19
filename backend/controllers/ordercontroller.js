import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeorder = async(req,res)=>{

    const frontendURL="https://your-render-backend.onrender.com/api/data"

    try{
        const neworder = new orderModel({           
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata:{}}); //cleaning the user cart 

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:'usd',
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'usd',
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100
            },
            quantity:1
        })

        const session =await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontendURL}/verify?success=true&orderId=${neworder._id}`,
            cancel_url:`${frontendURL}/verify?success=false&orderId=${neworder._id}`,
        })
        res.json({success:true,session_url:session.url})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const verifyorder =async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not paid"})

        }
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"}) 
    }
}


//user orders frontend 

const userOrders=async(req,res)=>{
    try{
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
        
    }catch(error){
        console.log(error);
        res.json({success:true,message:error})
    }
}

//listing orders for admin panel
const listorder = async(req,res)=>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})

    }
}

//api for updating order status

const updateStatus = async (req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"});
    }
}



export {placeorder,verifyorder,userOrders,listorder,updateStatus}