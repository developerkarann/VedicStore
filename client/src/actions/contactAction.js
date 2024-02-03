import axios from 'axios';
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from '../constants/contactConstants'


export const contactSubmit = (contactData) => async (dispatch) => {
    try {
        console.log(contactData)
        dispatch({ type:CONTACT_REQUEST });

        const { data } = await axios.post(`/api/v1/contact`, contactData)

        dispatch({ type: CONTACT_SUCCESS, playload: data.success})
    } catch (error) {
        dispatch({
            type: CONTACT_FAIL,
            payload: error.message
        })
    }
}
