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
import BannerSlider from './BannerSlider/BannerSlider'
import ProductsCategories from '../../product/ProductsCategories'


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

          <div className="homeComponent">


            <BannerSlider />

            <ProductsCategories />

            <h2 className='homeHeading'>Featured Product</h2>


            <div className="container" id='container'>
              {products && products.map((data, index) => <ProductCard product={data} key={index} />)}
            </div>
              <p onClick={viewAllProduct} style={{ cursor: 'pointer', textAlign:'center', marginBottom: '40px', fontSize: '20px' }} > <i class="fa-solid fa-cart-shopping"></i> All Products</p>


          </div>
        </>
      }
    </>
  )
}
