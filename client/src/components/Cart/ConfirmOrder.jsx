import React from 'react'
import './css/confirmOrder.css'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { Typography } from '@material-ui/core'
import { Link , useNavigate} from 'react-router-dom'

export default function ConfirmOrder() {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))

        navigate('/process/payment')


    }
    return (
        <>
            <MetaData title="Confirm Order! " />
            <CheckoutSteps activeSteps={1} />

            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Infomation</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems && cartItems.map((item, index) => (
                                <div key={item.product}>
                                    <img src={item.image} alt='Product' />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>{item.quantity} X ₹{item.price}</span>
                                    <b>₹{item.price * item.quantity}</b>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/*  */}
                <div>
                    <div className="orderSummary">


                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal: </p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges: </p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST: </p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="orderSummaryTotal">
                            <p><b>Total:</b></p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Procced To Payment</button>

                    </div>
                </div>
            </div >
        </>
    )
}
