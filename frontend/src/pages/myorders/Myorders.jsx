import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/frontend_assets/assets';

const Myorders = () => {
    const {url,token} = useContext(StoreContext);
    const [data , setData] = useState([]);
    

    const fetchorders = async()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data)
    }
    useEffect(()=>{
        if(token){
            fetchorders();

        }
    },[token])

  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className='myorders-order'>
                        <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+ "X" +item.quantity
                                }
                                else{
                                    return item.name+ "X" +item.quantity+ ","
                                }
                            })}</p>
                            <p>${order.amount}</p>
                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchorders}>Track Order</button>
                            
                        
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default Myorders





// import React, { useContext, useEffect, useState } from 'react';
// import './Myorders.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/frontend_assets/assets';

// const Myorders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     const fetchorders = async () => {
//         try {
//             const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
//             setData(response.data.data);
//             console.log(response.data.data);
//         } catch (error) {
//             console.error("Error fetching orders:", error);
//         }
//     };

//     useEffect(() => {
//         if (token && url) {
//             fetchorders();
//         }
//     }, [token, url]);

//     return (
//         <div className='myorders'>
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.length > 0 ? (
//                     data.map((order, index) => (
//                         <div key={index} className='myorders-order'>
//                             <img src={assets.parcel_icon} alt="Order Icon" />
//                             <p>
//                                 {order.items.map((item, index) => (
//                                     `${item.name} X ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`
//                                 ))}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No orders found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Myorders;
