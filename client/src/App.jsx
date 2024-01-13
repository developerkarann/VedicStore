import React, { useState } from 'react'
import './App.css'
import WebFont from 'webfontloader'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import UserOptions from './components/layout/header/UserOptions'
import { useSelector } from 'react-redux'
import Profile from './components/User/Profile/Profile'
import UpdateProfile from './components/User/Profile/UpdateProfile'
import ProtectedRoute from './components/Route/ProtectedRoute'
import UpdatePassword from './components/User/Password/UpdatePassword'
import ForgotPassword from './components/User/Password/ForgotPassword'
import ResetPassword from './components/User/Password/ResetPassword'



function App() {


  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid', 'Chilanka']
      }
    })
  }, [])

  store.dispatch(loadUser())

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/products' Component={Products} />
          <Route exact path='/product/:id' Component={ProductDetails} />
          <Route path='/products/:keyword' Component={Products} />
          <Route exact path='/search' Component={Search} />
          <Route exact path='/login' Component={LoginSignUp} />
          <Route exact path='/account' Component={Profile} />
          {/* <ProtectedRoute exact path='/account' Component={Profile} /> */}
          <Route exact path='/me/update' Component={UpdateProfile} />
          <Route exact path='/password/update' Component={UpdatePassword} />
          <Route exact path='/password/forgot' Component={ForgotPassword} />
          <Route exact path='/password/reset/:token' Component={ResetPassword} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
