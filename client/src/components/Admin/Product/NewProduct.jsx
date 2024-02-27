import React, { useState } from 'react'
import './css/newproduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, createProduct } from '../../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description'
import StorageIcon from '@material-ui/icons/Storage'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Sidebar from '../Dashboard/Sidebar'
import { NEW_PRODUCT_RESET } from '../../../constants/productConstants'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function NewProduct() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()

    const { isAuthenticated } = useSelector((state) => state.user)
    const { loading, error, success } = useSelector((state) => state.newProduct)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])




    const categories = [
        "Scriptures",
        "Spiritual Products",
        "Idols",
        "Cloths",
    ];

    const createProductImageChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([])
        setImagePreview([])

        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                setImagePreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
            }

            reader.readAsDataURL(file)
        })

    }

    const createProductSubmitHandler = (e) => {
        e.preventDefault()

        const myForm = new FormData()

        myForm.set('name', name)
        myForm.set('price', price)
        myForm.set('description', description)
        myForm.set('category', category)
        myForm.set('stock', stock)

        images.forEach((img) => {
            myForm.append('images', img)
        });

        dispatch(createProduct(myForm))

    }


    useEffect(() => {
        if (isAuthenticated && isAuthenticated === false) {
            navigate('/login')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            alert.success("Product Created")
            dispatch({ type: NEW_PRODUCT_RESET })
            setTimeout(() => {
                document.location.reload()
            }, 1000);
            // navigate('/admin/dashboard')
        }

    }, [navigate, isAuthenticated, error, alert, success])


    return (
        <>
            <MetaData title="Create Product" />

            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">
                    <form className='createProductForm' encType='multipart/form-data' onSubmit={createProductSubmitHandler}>

                        <h1>CREATE PRODUCT</h1>

                        <div>
                            <SpellcheckIcon />
                            <input type="text" placeholder='Product Name' required
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input type="number" placeholder='Product Price' required
                                value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea cols="30" rows="1" placeholder='Product Description' required
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)} >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option value={cate} key={cate}>{cate}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input type="number" placeholder='Stock' required
                                value={stock} onChange={(e) => setStock(e.target.value)} />
                        </div>

                        <div id='createProductFormFile'>

                            <input onChange={createProductImageChange} type="file" multiple name="avatar" accept='image/*' />

                        </div>

                        <div id="createProductFormImage">
                            {imagePreview && imagePreview.map((image, index) => (
                                <img src={image} key={index} alt="Product Preview" />
                            ))}
                        </div>

                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>
                            Create Product
                        </Button>

                    </form>
                </div>
            </div>

        </>
    )
}
