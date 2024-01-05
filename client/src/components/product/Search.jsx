import React, { useState } from 'react'
import './search.css'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
export default function Search() {

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
    // console.log(keyword)
    return (

        <>
            <MetaData title='Search a product' />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Search A Product' onChange={(e) => setKeyword(e.target.value)} />
                <input type="submit" defaultValue="Search" />
            </form>

        </>
    )
}
