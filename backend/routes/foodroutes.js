import express from "express";
import { addFood } from "../controllers/foodcontroller.js";
import multer from 'multer' //we use multer for the storing of images

//create express router

const foodrouter = express.Router(); // now we can use the get post etc methods.. add the api in the server.js

// image storage engine
const storage  = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,callback)=>{
        return callback(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
foodrouter.post('/add',upload.single("image"),addFood)






export default foodrouter;