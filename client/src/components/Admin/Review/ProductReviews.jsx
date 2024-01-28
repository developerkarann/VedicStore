import React, { useEffect, useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import Star from '@material-ui/icons/Star'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from '../Dashboard/Sidebar'
import './productReviews.css'
import { clearErrors, deleteReviews, getAllReviews } from '../../../actions/productAction'
import { DELETE_REVIEW_RESET } from '../../../constants/productConstants'


export default function ProductReviews() {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, reviews } = useSelector((state) => state.productReviews)
    const { error: deleteError, isDeleted, loading } = useSelector((state) => state.review)

    const [productId, setProductId] = useState('')

    //Delete Product Function

    const deleteReviewtHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId))
    }

    const productReviewSubmitHandler = (e) => {
          e.preventDefault()

          dispatch(getAllReviews(productId))
          console.log(productId)
    }


    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
        { field: "user", headerName: "User", minWidth: 200, flex: 0.3 },
        { field: "comment", headerName: "Comment", minWidth: 150, flex: 0.5 },
        {
            field: "rating", headerName: "Rating", type: 'number', minWidth: 150, flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? 'greenColor'
                    : 'redColor'
            }
        },
        {
            field: "action", headerName: "Actions", type: 'number', minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => deleteReviewtHandler(params.getValue(params.id, 'id'))} > <DeleteIcon /> </Button>
                    </>
                )
            }

        },
    ];


    const rows = [];

    reviews && reviews.forEach((item, index) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        })
    })



    useEffect(() => {
        if(productId.length === 24){
          dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('Review Deleted')
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, error, isDeleted, deleteError, productId])


    return (
        <>

            <MetaData title="All Reviews - Admin" />

            <div className="dashboard">
                <Sidebar />

                <div className="productReviewsContainer">

                    <form className='productReviewsForm' encType='multipart/form-data' onSubmit={productReviewSubmitHandler}>

                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input type="text" placeholder='Product Id' required
                                onChange={(e) => setProductId(e.target.value)} value={productId}  />
                        </div>



                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false || productId === '' ? true : false}>
                            Search
                        </Button>


                    </form>

                    {reviews && reviews.length > 0 ?
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='productListTable'
                        /> :
                        <h1 className='productReviewFormHeading' >No Reviews Found</h1>
                    }

                </div>

            </div>
        </>
    )
}
