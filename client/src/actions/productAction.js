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
    NEW_REVIEW_FAIL
} from '../constants/productConstants';
import {backendServer} from '../constants/backendServer'

export const getProduct = (keyword = "", currentPage=1 , category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })

        let link = `${backendServer}/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`

        if(category){
            link = `${backendServer}/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`
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
// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${backendServer}/api/v1/product/${id}`);
        // const { data } = await axios.get(`http://localhost:4000/api/v1/product/658af959bb97675a59ccfeaf`);

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

        const { data } = await axios.put(`${backendServer}/api/v1/review`, reviewData ,config);

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