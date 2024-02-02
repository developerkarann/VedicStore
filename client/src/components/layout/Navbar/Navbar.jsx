import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useSelector } from 'react-redux'
import UserOptions from '../header/UserOptions'
// import { Typewriter } from 'react-simple-typewriter'

export default function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.user)

    const burger = () => {
        const menu = document.querySelector('.menu');
        const i = document.querySelector('.fa-bars');
        menu.classList.toggle('active');
        i.classList.toggle('active');
    }


    const [keyword, setKeyword] = useState("")
    const negivate = useNavigate()
    const searchSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            negivate(`/products/${keyword}`)
        } else {
            negivate(`/products`)
        }
    }
    return (
        <>
            <nav className="navbar">
                {/* {isAuthenticated && <UserOptions user={user} />} */}
                <div className="max-width">
                    <div className="logo">
                        <Link to="/"> <img src="./whitelogo.png" className='brandLogo' alt="" /> </Link>

                    </div>
                    {/* <form className="searchBox" onSubmit={searchSubmitHandler}>
                        <input type="text" placeholder='Search A Product' onChange={(e) => setKeyword(e.target.value)} />
                        <button type='submit'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form> */}
                    <ul className="menu">
                        <li ><p className="menu-btn nav-user">{user ? user.name : 'Welcome'}</p></li>
                        <li onClick={burger}><Link to="/" className="menu-btn">Home</Link></li>
                        <li onClick={burger}><Link to="/products" className="menu-btn">Products</Link></li>
                        <li onClick={burger}><Link to="/about" className="menu-btn">About</Link></li>
                        <li onClick={burger}><Link to="/contact" className="menu-btn">Contact</Link></li>
                        <li onClick={burger}><Link to="/cart" className="menu-btn"><i className="fa-solid fa-cart-shopping"></i> Cart</Link></li>
                        <li onClick={burger}><Link to="/account" className="menu-btn"><i className="fa-solid fa-user"></i> {isAuthenticated ? 'Account': 'Login'}</Link></li>
                        {isAuthenticated && <UserOptions user={user} burger={burger} />}
                    </ul>

                    <div className="menu-btn">
                        <i className="fas fa-bars" onClick={burger}> </i>
                    </div>
                </div>
            </nav>
        </>
    )
}
