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
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
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
        console.log(userData)
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

        const { data } = await axios.get(`/api/v1/me`, config)

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

        const updateConfig = { Headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };

        const { data } = await axios.put(`${backendServer}/api/v1/me/update`, userData, updateConfig)

        dispatch({ type: UPDATE_PROFILE_SUCCESS, playload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}
//UPDATE PASSWORD
export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });


        const { data } = await axios.put(`${backendServer}/api/v1/password/update`, password, config)

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, playload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

//Forgot Password
export const forgotPassowrd = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });


        const { data } = await axios.post(`${backendServer}/api/v1/password/forgot`, email, config)

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}
//Reset Password
export const resetPassowrd = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });


        const { data } = await axios.put(`${backendServer}/api/v1/password/reset/${token}`, passwords, config)

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


// For Admin

//Get All Users --Admin
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });

        const { data } = await axios.get(`${backendServer}/api/v1/admin/users`, config)

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get User Details --Admin
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`${backendServer}/api/v1/admin/user/${id}`, config)

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update User --Admin
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const { data } = await axios.put(`${backendServer}/api/v1/admin/user/${id}`, userData, config)

        dispatch({ type: UPDATE_USER_SUCCESS, playload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete User --Admin
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`${backendServer}/api/v1/admin/user/${id}`, config)

        dispatch({ type: DELETE_USER_SUCCESS, playload: data.success })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}