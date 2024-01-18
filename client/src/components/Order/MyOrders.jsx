import React, { useEffect } from 'react'
import './myorders.css'
import { DataGrid } from '@material-ui/data-grid'
import LaunchIcon from '@material-ui/icons/Launch'
import MetaData from '../layout/MetaData'
import Loader from '../layout/loader/Loader'
import { Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { clearErrors, myOrders } from '../../actions/orderAction'


export default function MyOrders() {

    const disptach = useDispatch()
    const alert = useAlert()

    const { loading, error, orders } = useSelector((state) => state.myOrders)
    const { user } = useSelector((state) => state.user)

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.8 },
        {
            field: "status", headerName: "status", minWidth: 150, flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === 'Delivered'
                    ? 'greenColor'
                    : 'redColor'
            }
        },
        { field: "itemQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", type: "number", minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                )
            }
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            })
        })

    useEffect(() => {
        if (error) {
            alert.error(error)
            disptach(clearErrors())
        }

        disptach(myOrders())
    }, [disptach, alert, error])

    return (
        <>
            {!user ?
                <>
                    <Loader />
                </> :
                <>
                    <MetaData title={`${user.name} - Orders`} />

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className='myOrdersPage'>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className='myOrderTable'
                                autoHeight
                            />

                            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                        </div>
                    )}
                </>}
        </>
    )
}
