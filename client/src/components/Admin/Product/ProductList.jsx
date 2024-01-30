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
import './css/productList.css'
import { clearErrors, deleteProduct, getAdminProducts } from '../../../actions/productAction'
import { DELETE_PRODUCT_RESET } from '../../../constants/productConstants'


export default function ProductList() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, products } = useSelector((state) => state.products)
    const { error: deleteError, isDeleted } = useSelector((state) => state.adminProduct)

    //Delete Product Function

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 0.5 },
        { field: "stock", headerName: "Stock", type: 'number', minWidth: 150, flex: 0.3 },
        { field: "price", headerName: "Price", type: 'number', minWidth: 270, flex: 0.5 },
        {
            field: "action", headerName: "Actions", type: 'number', minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}> <EditIcon /></Link>
                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))} > <DeleteIcon /> </Button>
                    </>
                )
            }

        },
    ];


    const rows = [];

    products && products.forEach((item, index) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
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
            alert.success('Product Deleted')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts())
    }, [dispatch, alert, error, isDeleted, deleteError])


    return (
        <>

            <MetaData title="Admin - Products" />

            <div className="dashboard">
                <Sidebar />

                <div className="productListContainer">
                    <h1 id='productListHeading'>ALL PRODUCT</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>

            </div>
        </>
    )
}
