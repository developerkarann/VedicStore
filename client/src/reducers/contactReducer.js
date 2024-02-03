import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_RESET, CONTACT_SUCCESS } from '../constants/contactConstants' 


export const contactReducer = (state = { contact: {} }, action) => {
    switch (action.type) {
        case CONTACT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                isSubmit: true,
                success: action.payload,
            };

        case CONTACT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CONTACT_RESET:
            return {
                ...state,
                isSubmit: false,
            };

        default:
            return state
    }
}