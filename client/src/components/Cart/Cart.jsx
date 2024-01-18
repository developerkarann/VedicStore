import React from 'react'
import './css/cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
import { useAlert } from 'react-alert';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { cartItems } = useSelector((state) => state.cart)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const deletecartItem = (id) => {
        dispatch(removeItemsFromCart(id))
        alert.success('Item Removed ')
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    return (
        <>
            <MetaData title="Cart - Ecommerce" />
            {cartItems.length === 0 ?
                <>
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />
                        <Typography>No Products In Your Cart</Typography>
                        <Link to='/products'>View Products</Link>
                    </div>
                </>
                :
                <>

                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map((item, index) => (
                            <div className="cartContainer" key={index}>
                                <CartItemCard item={item} deletecartItem={deletecartItem} key={item.id} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
                            </div>

                        ))}
                        <div className="cartGrossTotal">
                            <div></div>
                            <div>
                                <div className="cartGrossTotalBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price, 0
                                    )}`}</p>
                                </div>
                            </div>
                            <div></div>
                            <div className='checkOutBtn'>
                                <button onClick={checkOutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
