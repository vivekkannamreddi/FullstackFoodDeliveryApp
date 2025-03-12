// import React, { use, useEffect, useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'


// const Add = () => {
//   const url = "http://localhost:3000";
//   const [image , setImage] = useState(false)
//   const [data,setData] = useState({
//     name:'',
//     description:'',
//     price:'',
//     category:'Salad' //when we reload the page the default will be the salad
//   })
//   const onchangehandler=(event)=>{
//       const name = event.target.name;
//       const value = event.target.value;
//       setData(prev=>({...prev ,[name]:value  }))
//   }
//   const onsubmithandler=async (event)=>{
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name",data.name)
//     formData.append("description",data.description)
//     formData.append("price",Number(data.price))
//     formData.append("category",data.category)
//     formData.append("image",image)
//     const res = await axios.post(`${url}/api/food/add`,formData)
//     if(res.data.success){
//       setData({
//         name:'',
//         description:'',
//         price:'',
//         category:'Salad'
//       })
//       setImage(fal  se)
//       toast.success(res.data.message)
//     }else{

//     }
//   }

//   return (
//     <div className='add' onSubmit={onsubmithandler}>
//       <form className='flex-col'>
//         <div className="add-image-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor='image'>
//             <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
//           </label>
//           <input onChange={(e)=>setImage(e.target.files[0] )} type="file" id='image' hidden required />

//         </div>
//         <div className="add-product-name flex-col">
//             <p>Product Name</p>
//             <input type="text" onChange={onchangehandler} value={data.name} name='name' placeholder='Type here' />
//         </div>
//         <div className="add-product-description flex-col">
//           <p>Product description</p>
//           <textarea  name='description' onChange={onchangehandler} value={data.description} rows="6"  placeholder='write content here' required/>
//         </div>
//         <div className="add-category-price">
//           <div className="add-category flex-col ">
//             <p>Product Category</p>
//             <select onChange={onchangehandler}  name="category" >
//               <option value="Salad">Salad</option>
//               <option value="Rolls">Rolls</option>
//               <option value="Desert">Desert</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Cake">Cake</option>
//               <option value="Pure veg">Pure veg</option>
//               <option value="Pasta">Pasta</option>
//               <option value="Noodles">Noodles</option>
//             </select>
//           </div>
//           <div className="add-price flex-col">
//               <p>Product price</p>
//               <input type="Number" onChange={onchangehandler} value={data.price} name='price' placeholder='$20' />
//           </div>
//         </div>
//         <button type='submit' className='add-btn'>Add</button>
//       </form>
      
//     </div>
//   )
// }

// export default Add



import React, { useState, useRef } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Add = () => {
  const url = "http://localhost:3000";
  const fileInputRef = useRef(null); // Use ref to reset file input field

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad' // Default category
  });

  const onchangehandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onsubmithandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${url}/api/food/add`, formData);
      if (res.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Salad'
        });
        setImage(null);

        // Reset the file input field
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        toast.success(res.data.message, { position: "top-right" });
      } else {
        toast.error("Something went wrong!", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Failed to upload", { position: "top-right" });
      console.error("Upload error:", error);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmithandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input 
            ref={fileInputRef} // Attach ref for reset functionality
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            hidden 
            required 
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" onChange={onchangehandler} value={data.name} name='name' placeholder='Type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea name='description' onChange={onchangehandler} value={data.description} rows="6" placeholder='Write content here' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onchangehandler} name="category" value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="Number" onChange={onchangehandler} value={data.price} name='price' placeholder='$20' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;
