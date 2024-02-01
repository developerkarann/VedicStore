import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import ReviewCard from './ReviewCard'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

export default function ProductDetails({ match }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alert = useAlert()

    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector((state) => state.newReview)


    const options = {
        value: product.ratings,
        readOnly: true,
        size: "large",
        precision: 0.5
    }

    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty)
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success('Item Added To Cart!')
    }

    const submitReviewToggel = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData()

        myForm.set('rating', rating)
        myForm.set('comment', comment)
        myForm.set('productId', id)

        dispatch(newReview(myForm))

        setOpen(false)

        // location.reload()
    }



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Reviews Submitted Successfully!')
            dispatch({ type: NEW_REVIEW_RESET })
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, id, reviewError, success])
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={`${product.name} -Ecommerce`} />

                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images.map((item, i) => {
                                        return (
                                            <img className='CarouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${i} slide`} />
                                        )
                                    })}


                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                {/* <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span> */}
                            </div>
                            <div className="detailsBlock-3">
                                <h1>₹{product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" readOnly value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>{" "}
                                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                                        {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggel} className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    <h3 className='reviewHeading'>REVIEWS</h3>
                    <Dialog
                        aria-label='simple-dialog-title'
                        open={open}
                        onClose={submitReviewToggel}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className='submitDialg'>
                            <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />

                            <textarea className='submitDialogTextarea' value={comment} onChange={(e) => setComment(e.target.value)} cols="30" rows="10">

                            </textarea>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={submitReviewToggel} color='secondary' >Cancel</Button>
                            <Button onClick={reviewSubmitHandler} color='primary' >Submit</Button>
                        </DialogActions>


                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className='reviews'>
                            {product.reviews &&
                                product.reviews.map((review) => <ReviewCard review={review} />)}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet  ): </p>
                    )}

                </>
            }

        </>
    )
}
