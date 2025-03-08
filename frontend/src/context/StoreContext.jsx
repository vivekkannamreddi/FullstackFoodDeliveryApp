import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);


const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
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
    const Contextvalue ={
        food_list,
        cartItems,
        setCartItems,
        addtocart,
        removefromcart
    }
    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])
    return (
        <StoreContext.Provider value={Contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;