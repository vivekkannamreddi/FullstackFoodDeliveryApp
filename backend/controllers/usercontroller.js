import userModel from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import { error } from "console";


//login user

const loginUser =  async (req, res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"user does not exists"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.json({success:false,message:"invalid credetials"});
        }
        const token = createToken(user._id);
        res.json({success:true,token});

    }catch(error){
        res.json({success:false,message:"error"});
    }
    
}

//token to save the user data to database

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register user

const registerUser =  async (req, res)=>{
    const {name,password,email} = req.body;
    try{
        // checking if the user is already exists or not in the database
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"invalid email please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter a storng password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)  //range is 5-15 larger number stronger password
        const hassedPass = await bcrypt.hash(password,salt);


        const newUser = new userModel({
            name:name,
            password:hassedPass,
            email:email
        })

        const user = await newUser.save(); //saving the newuser in the user variable and saving in te database ,  to save we need to create a token
        const token  = createToken(user._id);
        res.json({success:true,token})

        
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error in registering user"})

    }
}

export {loginUser,registerUser}