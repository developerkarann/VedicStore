import React from 'react'
import './productcategory.css'
import { Link } from 'react-router-dom'


export default function ProductsCategories() {
    const categories = [
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/scripture_sj2zmo.jpg',
            name: 'Scriptures'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/spiritualProduct_b6rkdy.jpg',
            name: 'Spiritual Products'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980527/assests/idol_vx3tua.webp',
            name: 'Idols'
        },
        {
            img: 'https://res.cloudinary.com/dnxuag27j/image/upload/v1706980528/assests/cloths_mn3jor.jpg',
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
