import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='exploremenu' id="exploremenu">
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Explore our diverse menu filled with delicious dishes, from sizzling appetizers to hearty mains and delightful desserts. Whether you crave a classic favorite or something new, we have the perfect flavors for you. Find your favorites and indulge in a delicious experience with just a few clicks!</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>{setCategory(prev=>(prev===item.menu_name?"All":item.menu_name))}} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
                })
            }
        </div>
        <hr/>
    </div>
    
  )
}

export default Exploremenu