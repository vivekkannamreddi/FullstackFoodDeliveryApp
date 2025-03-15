import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);


const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = 'http://localhost:3000';
    const [token , setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addtocart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removefromcart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
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

        useEffect(()=>{
            
            async function loadData(){
                await fetchFoodList();
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"));
                }
            }
            loadData()
        })


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