import React, { useState } from 'react'
import './App.css'
import WebFont from 'webfontloader'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Compnents
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Home from './components/layout/home/Home'
import ProductDetails from './components/product/ProductDetails'


function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid', 'Chilanka']
      }
    })
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/product/:id' Component={ProductDetails} />

        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
