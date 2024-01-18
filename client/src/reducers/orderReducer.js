import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants'

export const newOrderReducer = (state = {}, action) =>{
    switch (action.payload) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: truem
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: true,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                loading: true,
                error: action.payload,
            }
               
    
        default:
            return state
    }
}