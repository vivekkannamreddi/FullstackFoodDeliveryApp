import mongoose from "mongoose";

const foodschema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
})

//using the above schema we have to create the models... (below)

const foodmodel = mongoose.models.food ||mongoose.model("food",foodschema);

export default foodmodel;

//we need to create the api's in the controller section so that we can add new food items