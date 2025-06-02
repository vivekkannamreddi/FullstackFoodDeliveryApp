import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);


const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = 'https://fullstackfooddeliveryapp.onrender.com';
    const [token , setToken] = useState("");

        
    const [food_list,setFoodList] = useState([])

    const addtocart= async(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
            // await fetchCartData(); 
        }
    }
    const removefromcart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
            // await fetchCartData(); 
        }
        
    }

        const getTotalCartAmount=()=>{
            let totalAmount=0; 
            
            for(const item in cartItems){
                if(cartItems[item]>0){
                    let itemInfo = food_list.find((product)=>product._id===item)
                    totalAmount+=itemInfo.price*cartItems[item];
                }
            }
            return totalAmount;
        }

        const fetchFoodList = async ()=>{
            const response = await axios.get(url+"/api/food/list");
            setFoodList(response.data.data);
        }
        const loadcartdata = async(token)=>{
            const response = await axios.post(url+'/api/cart/get',{},{headers:{token}});
            setCartItems(response.data.cartdata);
        }
        useEffect(()=>{
            
            async function loadData(){
                await fetchFoodList();
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                    await loadcartdata(localStorage.getItem("token"))
                }
            }
            loadData()
        },[])


    const Contextvalue ={
        food_list,
        cartItems,
        setCartItems,
        addtocart,
        removefromcart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    



    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;    