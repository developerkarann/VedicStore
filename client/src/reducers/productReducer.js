import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

    ALL_PRODUCT_CLEARERRORS
} from '../constants/productConstants'

export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                // filterProductsCount: action.payload.filterProductsCount,
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case ALL_PRODUCT_CLEARERRORS:
            return {
                ...state,
                error: null
            };

        default:
            return state
    }
};

// Product Details Reducers

export const productDetailsReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        default:
            return state
    }
};