import axios from "axios";
import { backendServer } from '../constants/backendServer'
import { CLEAR_ERRORS, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants";

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

// Get My  Orders 
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.get(`${backendServer}/api/v1/orders/me`, config)

        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
};

// Get Order Details 
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.get(`${backendServer}/api/v1/order/${id}`, config)

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
};

// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}