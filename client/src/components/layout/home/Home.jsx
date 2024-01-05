import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import ProductCard from './ProductCard'
import MetaData from '../MetaData'
import { clearErrors, getProduct } from '../../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/Loader'
import {useAlert} from 'react-alert'

export default function Home() {

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products)
  const alert= useAlert()


  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }
    dispatch(getProduct());
  }, [dispatch,error,alert])



  return (
    <>
      {loading ? <Loader/> :
        <>
          <MetaData title="Home - Ecommerce" />
          <div className="banner">
            <p>Welcome To E-Commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW </h1>
            <a href="#container">
              <button>Scroll <CgMouse /> </button>
            </a>
          </div>

          <h2 className='homeHeading'>Featured Product</h2>

          <div className="container" id='container'>
            {products && products.map((data) => <ProductCard product={data} />)}
          </div>
        </>
      }
    </>
  )
}
