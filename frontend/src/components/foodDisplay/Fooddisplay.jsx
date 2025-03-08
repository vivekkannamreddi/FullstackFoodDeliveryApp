import React, { useContext } from 'react'
import './Fooddisplay.css'
import { StoreContext } from '../../context/StoreContext'


const Fooddisplay = () => {
    const {food_list} = useContext(StoreContext)
  return (
    <div>
        
    </div>
  )
}

export default Fooddisplay