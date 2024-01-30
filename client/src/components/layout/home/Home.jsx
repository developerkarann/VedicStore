import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './home.css'
import ProductCard from './ProductCard'
import MetaData from '../MetaData'
import { clearErrors, getProduct } from '../../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../loader/Loader'
import { useAlert } from 'react-alert'
import logoImg from '../../../assets/image/logo.png'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(state => state.products)
  const alert = useAlert()

  const viewAllProduct = () => {
    navigate('/products')
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors)
    }
    dispatch(getProduct());
  }, [dispatch, error, alert])



  return (
    <>
      {loading ? <Loader /> :
        <>
          <MetaData title="Home - Ecommerce" />
          <div className="banner">
            {/* <p>Welcome To</p> */}
            <img src='./logo.png' alt="" className='logoImg' />
            <h1>FIND AMAZING PRODUCTS BELOW </h1>
            <a href="#container">
              <button>Scroll <CgMouse /> </button>
              {/* <button class="btn"><i class="animation"></i> Scroll <CgMouse />  <i class="animation"></i>
              </button> */}

            </a>
          </div>

          <h2 className='homeHeading'>Featured Product</h2>

          <div className="container" id='container'>
            {products && products.map((data, index) => <ProductCard product={data} key={index} />)}
          </div>
          {/* <h5 className='allProductHeading'>
            <Link to='/products'>All Product</Link>
          </h5> */}
          <div className="allProductHead" >
            <button class="learn-more" onClick={viewAllProduct}>
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">More Products</span>
            </button>
          </div>
        </>
      }
    </>
  )
}
