import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'
// import CheckoutSteps from './CheckoutSteps'
import { Typography } from '@material-ui/core'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../layout/loader/Loader'
import Sidebar from '../Dashboard/Sidebar'
import { getOrderDetails, clearErrors, updateOrder } from '../../../actions/orderAction'
import { useAlert } from 'react-alert'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import { Button } from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstants'



export default function ProcessOrder() {
    const { loading, error, order } = useSelector((state) => state.orderDetails)

    const { error: updateError, isUpdated } = useSelector((state) => state.order)

    const disptach = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const [status, setStatus] = useState('')


    const updateOrderStatus = (e) => {
        // e.preventDefault()

        const myForm = new FormData()

        myForm.set('status', status)

        disptach(updateOrder(id, myForm))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            disptach(clearErrors())
        }
        if (updateError) {
            alert.error(error)
            disptach(clearErrors())
        }
        if (isUpdated) {
            alert.success('Order Updated')
            disptach({ type: UPDATE_ORDER_RESET })
        }

        disptach(getOrderDetails(id))
    }, [disptach, alert, error, id])
    return (
        <>
            {loading || !order ? <Loader /> :
                <>
                    <MetaData title="Process Order - Admin" />

                    <div className="dashboard">
                        <Sidebar />

                        <div className="newProductContainer">


                            <div className="confirmOrderPage" style={{display: order.orderStatus === 'Delivered' ? 'block': 'grid'}}>
                                <div>
                                    <div className="confirmShippingArea">
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

                                            <Typography style={{ fontSize: '2vmax' }}>Payment</Typography>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <p className={order.paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}>
                                                        {order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}
                                                    </p>
                                                </div>

                                            </div>
                                            <div>
                                                <p>Amound: </p>
                                                <span>{order.totalPrice}</span>
                                            </div>
                                            {/*  */}
                                            <Typography style={{ fontSize: '2vmax' }}>Order Status</Typography>
                                            <div className="orderDetailsContainerBox">
                                                <div>
                                                    <p className={order.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}>
                                                        {order.orderStatus}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="confirmCartItems">
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemsContainer">
                                            {order.orderItems && order.orderItems.map((item, index) => (
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
                                    <form className='createProductForm'
                                        style={{ height: '60vh', marginTop: '15vh', display: order.orderStatus === 'Delivered' ? 'none': 'block' }}
                                        onSubmit={updateOrderStatus}>

                                        <h1>Process Order</h1>


                                        <div>
                                            <AccountTreeIcon />
                                            <select onClick={(e) => setStatus(e.target.value)} >
                                                <option value="">Choose Category</option>
                                                {order.orderStatus === 'Processing' && (
                                                    <option value="Shipped">Shipped</option>
                                                )}
                                                {order.orderStatus === 'Shipped' && (
                                                    <option value="Delivered">Delivered</option>
                                                )}


                                            </select>
                                        </div>




                                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false || status === '' ? true : false}>
                                            Proccess
                                        </Button>


                                    </form>
                                </div>
                            </div >
                        </div>
                    </div>
                </>
            }
        </>
    )
}
