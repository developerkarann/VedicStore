import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import Product from './Product'
import MetaData from '../MetaData'
import { getProduct } from '../../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/Loader'
import {useAlert} from 'react-alert'

export default function Home() {

  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(state => state.products)
  const alert= useAlert()


  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct());
  }, [dispatch,error])



  return (
    <>
      {loading ? <Loader/> :
        <>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome To E-Commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW </h1>
            <a href="#container">
              <button>Scroll <CgMouse /> </button>
            </a>
          </div>

          <h2 className='homeHeading'>Featured Product</h2>

          <div className="container" id='container'>
            {products && products.map((data) => <Product product={data} />)}
          </div>
        </>
      }
    </>
  )
}
