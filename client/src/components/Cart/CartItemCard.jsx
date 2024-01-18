import React from 'react'
import './css/cartitemcard.css'
import { Link } from 'react-router-dom'

export default function CartItemCard({ item , deletecartItem}) {
    return (
        <>
            <div className="cartItemCard">
                <img src={item.image} alt={item.name} />
                <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: ₹${item.price}`}</span>
                    <p onClick={()=> deletecartItem(item.product)}>Remove</p>
                </div>
            </div>
        </>
    )
}
