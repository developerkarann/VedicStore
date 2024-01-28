import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, updateProduct, getProductDetails } from '../../../actions/productAction'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../../layout/MetaData'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import DescriptionIcon from '@material-ui/icons/Description'
import StorageIcon from '@material-ui/icons/Storage'
import SpellcheckIcon from '@material-ui/icons/Spellcheck'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Sidebar from '../Dashboard/Sidebar'
import { UPDATE_PRODUCT_RESET } from '../../../constants/productConstants'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'


export default function UpdateProduct() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()


    const { error, product } = useSelector((state) => state.productDetails)

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.adminProduct)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])




    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "Mobile",
    ];

    const updateProductImageChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([])
        setImagePreview([])
        setOldImages([])

        files.forEach((file) => {
            const reader = new FileReader()

            reader.onload = () => {
                setImagePreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
            }

            reader.readAsDataURL(file)
        })

    }

    const updateProductSubmitHandler = (e) => {
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

        dispatch(updateProduct(id, myForm))

    }


    useEffect(() => {

        if (product && product._id !== id) {
            dispatch(getProductDetails(id))
        } else {
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.stock)
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Product Updated")
            navigate('/admin/dashboard')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [navigate, error, alert, isUpdated, updateError, id, product])


    return (
        <>
            <MetaData title="Create Product" />

            <div className="dashboard">
                <Sidebar />

                <div className="newProductContainer">
                    <form className='createProductForm' encType='multipart/form-data' onSubmit={updateProductSubmitHandler}>

                        <h1>UPDATE PRODUCT</h1>

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
                            <select value={category} onChange={(e) => setCategory(e.target.value)} >
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

                            <input onChange={updateProductImageChange} type="file" multiple name="avatar" accept='image/*' />

                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img src={image.url} key={index} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagePreview && imagePreview.map((image, index) => (
                                <img src={image} key={index} alt="Product Preview" />
                            ))}
                        </div>

                        <Button id='createProductBtn' type='submit' disabled={loading ? true : false}>
                            Update Product
                        </Button>


                    </form>
                </div>
            </div>

        </>
    )
}
