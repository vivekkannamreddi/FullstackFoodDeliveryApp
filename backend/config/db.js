import mongoose from 'mongoose';

 export const connectDB =  async ()=>{
    await mongoose.connect('mongodb+srv://vivekkannamreddi:89190719281928@cluster0.796yy.mongodb.net/food-delivery').then(()=>{
        console.log("database connected...");
    })
}

//go to server.js middleware

