import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEARERRORS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios';
import { backendServer } from '../constants/backendServer'

const config = { Headers: { "Content-Type": "application/json" }, withCredentials: true };

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });


        const { data } = await axios.post(`${backendServer}/api/v1/login`, { email, password }, config)

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register a user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const regConfig = { Headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };

        const { data } = await axios.post(`${backendServer}/api/v1/register`, userData, regConfig)

        dispatch({ type: REGISTER_SUCCESS, playload: data.user })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(`${backendServer}/api/v1/me`, config)

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get(`${backendServer}/api/v1/logout`, config)

        dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Cleaing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEARERRORS })
}


//UPDATE Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });


        const { data } = await axios.put(`${backendServer}/api/v1/me/update`, userData, config)

        dispatch({ type: UPDATE_PROFILE_SUCCESS, playload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}