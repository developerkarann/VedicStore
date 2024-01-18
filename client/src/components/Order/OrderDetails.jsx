import React, { useEffect } from 'react'
import './orderDetails.css'
import MetaData from '../layout/MetaData'
import Loader from '../layout/loader/Loader'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetails } from '../../actions/orderAction'
export default function OrderDetails() {

    const disptach = useDispatch()
    const alert = useAlert()
    const { id } = useParams()
    const { loading, error, order } = useSelector((state) => state.orderDetails)


    useEffect(() => {
        if (error) {
            alert.error(error)
            disptach(clearErrors())
        }

        disptach(getOrderDetails(id))
    }, [disptach, alert, error, id])
    return (
        <>
            {!order ? <Loader /> :
                <>
                    {loading ? <Loader /> :
                        <>
                            <MetaData title="Order Details" />

                            <div className="orderDetailsPage">
                                <div className="orderDetailsContainer">
                                    <Typography component="h1">Order #{order && order._id}</Typography>
                                    <Typography>Shipping Infomation</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}</span>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}>
                                                {order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Amound: </p>
                                            <span>{order.totalPrice}</span>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p className={order.paymentStatus === 'succeeded' ? 'greenColor' : 'redColor'}>
                                                {order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                    {/*  */}
                                    <div className="orderDetailsCartItems">
                                        <Typography>Order Items:</Typography>
                                        <div className="orderDetailsCartItemsContainer">
                                            {order.orderItems.map((item, index) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt='Product' />
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    <span>{item.quantity} x ₹{item.price} ={" "}</span> 
                                                    <b>₹{item.price * item.quantity}</b>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
