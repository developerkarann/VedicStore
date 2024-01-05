import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import Loader from '../layout/loader/Loader'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'


export default function ProductDetails({ match }) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const alert = useAlert()

    const { product, loading, error } = useSelector((state) => state.productDetails)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, id])

    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.1)',
        activeColor: 'tomato',
        value: product.ratings,
        isHalf: true,
        size: Window.innerWidth < 600 ? 20 : 25
    }

    // console.log(product.images)
    return (
        <>
            {loading ? <Loader /> :
                <>
                <MetaData title={`${product.name} -Ecommerce`}/>
            
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
                                <ReactStars {...options} />
                                <span>({product.numOfReviews} Reviews)</span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>₹{product.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button>-</button>
                                        <input type="number" defaultValue="1" />
                                        <button>+</button>
                                    </div>{" "}
                                    <button>Add to Cart</button>
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

                            <button className='submitReview'>Submit Review</button>
                        </div>
                    </div>

                    <h3 className='reviewHeading'>REVIEWS</h3>

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
