import React, { useEffect, useState } from 'react'
import './products.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/loader/Loader'
import ProductCard from '../layout/home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import ProductsCategories from './ProductsCategories'
import ProductNotFound from '../layout/Not Found/ProductNotFound'
export default function Products() {

    const dispatch = useDispatch()
    const { products, loading, error, productsCount, resultPerPage, } = useSelector(state => state.products)
    const { keyword } = useParams()
    const alert = useAlert()
    // console.log(keyword)
    // console.log(productsCount)
    const [currentPage, setCurrentPage] = useState(1);
    // const [price, setPrice] = useState([0,500000]);
    const [category, setCategory] = useState('')
    const [ratings, setRating] = useState(0)


    const setCurrentPageNo = (e) => {
        // console.log(e)
        setCurrentPage(e)
    }

    // const priceHandler = (event, newPrice) =>{
    //     setPrice(newPrice)
    // }

    const categories = [
        "Scriptures",
        "Spiritual Products",
        "Idols",
        "Cloths",
    ];
    const cat = [
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/scripture_sj2zmo.jpg',
            name: 'Scriptures'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/spiritualProduct_b6rkdy.jpg',
            name: 'Spiritual Products'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980527/assests/idol_vx3tua.webp',
            name: 'Idols'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/cloths_mn3jor.jpg',
            name: 'Cloths'
        },
    ]


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, category, ratings))
    }, [dispatch, keyword, currentPage, category, ratings, alert, error])

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title='Products - Ecommerce' />
                    <div className="pCategories" style={{ marginTop: '5vmax' }}>
                        <div className="categoryContainer" id='container' >
                            {cat.map((item, index) => (
                                <div className='categoryCard' onClick={() => setCategory(item.name)}  >
                                    <img src={item.img} alt={item.name} />
                                    <p >{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className='productsHeading'>Products</h2>


                    <div className="products">
                        {
                            products && products.length > 0 ?
                                products.map((product) => {
                                    return (
                                        <ProductCard key={product._id} product={product} />
                                    )
                                })

                                :
                                <>
                                   <ProductNotFound/>
                                </>
                        }
                    </div>

                    <div className="filterBox">
                        <Typography style={{ fontSize: '1.5vmax' }}>Categories</Typography>
                        <ul className='categoryBox'>
                            {categories.map((category) => {
                                return (
                                    <li className='category-link' key={category} onClick={() => setCategory(category)}>{category}</li>
                                )
                            })}
                        </ul>

                        {/* <fieldset>
                            <Typography component="legend">Ratings</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => { setRating(newRating) }}
                                aria-labelledby='continous-slider'
                                min={0}
                                max={5}
                                valueLabelDisplay='auto'
                            >
                            </Slider>
                        </fieldset> */}
                    </div>

                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                // prevPageText="First"
                                // firstPageText="1st"
                                // lastPageText='Last'
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            >

                            </Pagination>
                        </div>
                    )}
                </>
            }
        </>
    )
}
