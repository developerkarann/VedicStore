import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEARERRORS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from '../constants/userConstants'
import axios from 'axios';
import { backendServer } from '../constants/backendServer'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { Headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${backendServer}/api/v1/login`, { email, password }, config)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { Headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(`${backendServer}/api/v1/register`, userData, config)

        dispatch({ type: REGISTER_SUCCESS, playload: data.user })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEARERRORS })
}