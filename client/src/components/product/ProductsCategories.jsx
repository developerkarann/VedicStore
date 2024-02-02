import React from 'react'
import './productcategory.css'
import { Link } from 'react-router-dom'


export default function ProductsCategories() {
    const categories = [
        {
            img: './assets/images/categories/boss.webp',
            name: 'Scriptures'
        },
        {
            img: './assets/images/categories/rudraksha.jpg',
            name: 'Spiritual Products'
        },
        {
            img: './assets/images/categories/aadiyogi.webp',
            name: 'Idols'
        },
        {
            img: './assets/images/categories/cloths.jpg',
            name: 'Cloths'
        },
    ]
    return (
        <>
            {/* <h2 className='categoryHeading'>Products Categories</h2> */}


            <div className="categoryContainer" id='container' >
                {categories.map((item, index) => (
                    <Link className='categoryCard' to="/products"  >
                        <img src={item.img} alt={item.name} />
                        <p>{item.name}</p>
                    </Link>
                ))}

            </div>
        </>
    )
}
