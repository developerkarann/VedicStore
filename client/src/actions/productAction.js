import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    ALL_PRODUCT_CLEARERRORS
} from '../constants/productConstants';
import {backendServer} from '../constants/backendServer'

export const getProduct = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST })

        const { data } = await axios.get(`${backendServer}/api/v1/products`);

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