import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from '../Dashboard/Sidebar'

import { deleteOrder, getAllOrders, clearErrors } from '../../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../../constants/orderConstants'

export default function OrderList() {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { error, orders } = useSelector((state) => state.allOrders)
  const { error: deleteError, isDeleted } = useSelector((state) => state.order)

  //Delete Order Function

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }


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
      field: "action", headerName: "Actions", type: 'number', minWidth: 150, flex: 0.3, sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}> <EditIcon /></Link>
            <Button onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))} > <DeleteIcon /> </Button>
          </>
        )
      }

    },
  ];


  const rows = [];

  orders && orders.forEach((item, index) => {
    rows.push({
      id: item._id,
      itemQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    })
  })



  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      alert.success('Order Deleted')
      dispatch({ type: DELETE_ORDER_RESET })
    }
    dispatch(getAllOrders())
  }, [dispatch, alert, error, isDeleted, deleteError])


  return (
    <>

      <MetaData title="All Orders - Admin" />

      <div className="dashboard">
        <Sidebar />

        <div className="productListContainer">
          <h1 id='productListHeading'>ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
          />
        </div>

      </div>
    </>
  )
}
