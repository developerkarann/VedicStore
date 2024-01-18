import axios from "axios";
import { backendServer } from '../constants/backendServer'
import { CLEAR_ERRORS, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS , CREATE_ORDER_FAIL } from "../constants/orderConstants";

// Create Order 
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })


        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(`${backendServer}/api/v1/order/new`, order, config)

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}