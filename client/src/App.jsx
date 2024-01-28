import React, { useState, useEffect } from 'react'
import './App.css'
import WebFont from 'webfontloader'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
//Compnents
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './components/layout/home/Home'
import ProductDetails from './components/product/ProductDetails'
import Products from './components/product/Products'
import Search from './components/product/Search'
import LoginSignUp from './components/User/LoginSignUp'
import store from './store'
import { loadUser } from './actions/userAction'
import Profile from './components/User/Profile/Profile'
import UpdateProfile from './components/User/Profile/UpdateProfile'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdatePassword from './components/User/Password/UpdatePassword'
import ForgotPassword from './components/User/Password/ForgotPassword'
import ResetPassword from './components/User/Password/ResetPassword'
import Cart from './components/Cart/Cart'
import Shipping from './components/Cart/Shipping'
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import ParentPayment from './components/Cart/ParentPayment'
import OrderSuccess from './components/Cart/OrderSuccess'
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import ProductList from './components/Admin/Product/ProductList'
import NewProduct from './components/Admin/Product/NewProduct'
import UpdateProduct from './components/Admin/Product/UpdateProduct'
import OrderList from './components/Admin/Order/OrderList'
import ProcessOrder from './components/Admin/Order/ProcessOrder'
import UsersList from './components/Admin/User/UsersList'
import UpdateUser from './components/Admin/User/UpdateUser'
import ProductReviews from './components/Admin/Review/ProductReviews'
import About from './components/layout/About/About'
import NotFound from './components/layout/Not Found/NotFound'




function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid', 'Chilanka']
      }
    })


  }, [])

  store.dispatch(loadUser())

  window.addEventListener('contextmenu', (e)=> e.preventDefault())

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/about' Component={About} />
          <Route exact path='/contact' Component={About} />
          <Route exact path='/products' Component={Products} />
          <Route exact path='/product/:id' Component={ProductDetails} />
          <Route path='/products/:keyword' Component={Products} />
          <Route exact path='/search' Component={Search} />
          <Route exact path='/login' Component={LoginSignUp} />
          <Route exact path='/account' Component={Profile} />
          <Route exact path='/me/update' Component={UpdateProfile} />
          <Route exact path='/password/update' Component={UpdatePassword} />
          <Route exact path='/password/forgot' Component={ForgotPassword} />
          <Route exact path='/password/reset/:token' Component={ResetPassword} />
          <Route exact path='/cart' Component={Cart} />
          <Route exact path='/login/shipping' Component={Shipping} />
          <Route exact path='/order/confirm' Component={ConfirmOrder} />
          <Route exact path='/process/payment' Component={ParentPayment} />
          <Route exact path='/success' Component={OrderSuccess} />
          <Route exact path='/orders' Component={MyOrders} />
          <Route exact path='/order/:id' Component={OrderDetails} />
          <Route exact path='/admin/dashboard' Component={Dashboard} />
          <Route exact path='/admin/products' Component={ProductList} />
          <Route exact path='/admin/product/new' Component={NewProduct} />
          <Route exact path='/admin/product/:id' Component={UpdateProduct} />
          <Route exact path='/admin/orders' Component={OrderList} />
          <Route exact path='/admin/order/:id' Component={ProcessOrder} />
          <Route exact path='/admin/users' Component={UsersList} />
          <Route exact path='/admin/user/:id' Component={UpdateUser} />
          <Route exact path='/admin/reviews' Component={ProductReviews} />
          
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
