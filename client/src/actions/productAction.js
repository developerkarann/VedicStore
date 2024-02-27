import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    ALL_PRODUCT_CLEARERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL
} from '../constants/productConstants';
import { backendServer } from '../constants/backendServer'

export const getProduct = (keyword = "", currentPage = 1, category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`

        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`
        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get Products --Admin

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };


        const { data } = await axios.get(`/api/v1/admin/products`, config)

        dispatch({ type: ADMIN_PRODUCTS_SUCCESS, payload: data.products })
    } catch (error) {
        dispatch({ type: ADMIN_PRODUCTS_FAIL, payload: error.response.data.message})
    }
}

// Create New Products --Admin
export const createProduct = (productData) => async (dispatch) => {
    try {
        console.log(productData)
        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete Product --Admin
export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`, config);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Products --Admin
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ALL_PRODUCT_CLEARERRORS })
}


// Create New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.message
        })
    }
}

// Get All Reviws --Admin 

export const getAllReviews = (productId) => async (dispatch) => {
    try {
        // console.log(productId)
        dispatch({ type: ALL_REVIEW_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.get(`/api/v1/reviews?id=${productId}`, config);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        console.log(reviewId, productId)
        dispatch({ type: DELETE_REVIEW_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`, config);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

