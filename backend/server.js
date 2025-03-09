import express from 'express'
import cors from 'cors'

//app config

const app =express();
const port = 3000;

// middleware
app.use(express.json())   //whenever we get the request from frontend to backend it will be parsed through json
app.use(cors()); // to allow cross origin request     or     we can access the backend from any frontend 

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}...`)
})

//mongodb+srv://vivekkannamreddi:<db_password>@cluster0.796yy.mongodb.net/?