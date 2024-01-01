import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
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
// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: ALL_PRODUCT_CLEARERRORS })
}