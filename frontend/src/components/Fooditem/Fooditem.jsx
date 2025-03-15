import React, { useContext, useState } from 'react'
import './Fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Fooditem = ({id,name,price,description,image}) => {
    const {cartItems,addtocart,removefromcart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-image-container">
            <img src={url+"/images/"+image} className='food-item-image ' alt="" />
            {!cartItems[id]
               ?<img src={assets.add_icon_white} onClick={()=>addtocart(id) }className="add"alt="" />
               :<div className='add-item-counter'>
                    <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addtocart(id)} src={assets.add_icon_green} alt="" />
               </div>
               
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts}alt="" />
            </div>
            <p className='food-item-description'>{description}</p>
            <p className='food-item-price'>${price}</p>
        </div>

    </div>
  )
}

export default Fooditem