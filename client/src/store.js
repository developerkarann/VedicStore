import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, reviewsReducer } from './reducers/productReducer';
import { allUsersReducer, forgotPassowrdReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailReducer, ordersReducer } from './reducers/orderReducer';


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPassowrdReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    adminProduct: adminProductReducer,
    allOrders: allOrdersReducer,
    order: ordersReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewsReducer
});

let intialState = {
    cart: {
        cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
        shippingInfo: localStorage.getItem('shippingINfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;