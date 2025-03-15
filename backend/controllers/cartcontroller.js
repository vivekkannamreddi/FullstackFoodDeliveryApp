import userModel from "../models/userModels.js"

//add to cart

const addToCart =async (req,res)=>{
    try{
        let userdata = await userModel.findById(req.body.userId);
        let cartdata = await userdata.cartdata;
        if(!cartdata[req.body.itemId]){
            cartdata[req.body.itemId]=1
        }
        else{
            cartdata[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:"Added to cart"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in adding to cart"})
    }
}

//remove from cart

const removeFromCart =async (req,res)=>{
    try{
        let userdata = await userModel.findById(req.body.userId);
        let cartdata = await userdata.cartdata;
        if(cartdata[req.body.itemId]>0){
            cartdata[req.body.itemId]-=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartdata});
        res.json({success:true,message:"Removed from cart"})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in removing from cart"})
    }
}

//fetch user cart data  

const getCart =async (req,res)=>{
    try{
        let userdata = await userModel.findById(req.body.userId);
        let cartdata = await userdata.cartdata;
        res.json({success:true,cartdata})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}