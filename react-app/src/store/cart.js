const LOAD = 'cart/LOAD';
const ADD_ONE = 'cart/ADD_ONE';
const DELETE = 'cart/DELETE';
const EDIT = 'cart/EDIT';

const load = (carts) => ({
    type: LOAD,
    payload: carts
});

const addOne = (cart) => ({
    type: ADD_ONE,
    cart
});

const deleteOne = (cartId) => ({
    type: DELETE,
    cartId
});

const editOne = (cart) => ({
    type: EDIT,
    cart
});

export const getCart = (userId) => async (dispatch) => {
    if (userId) {
        const response = await fetch(`/api/${userId}/cart`)
        if (response.ok) {
            const cart = await response.json();
            const newCart = cart.Cart_item;
            dispatch(load(newCart));
            return newCart;
        };
    } else {
        return ['User is not logged in.']
    };
};

export const addCart = (user, item) => async (dispatch) => {
    const response = await fetch(`/api/${user}/cart/${item}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "product_id": item, "user_id": user })
    });
    if (response.ok) {
        const cart = await response.json();
        dispatch(addOne(cart));
        return cart;
    };
};

export const deleteCart = (user, item) => async (dispatch) => {
    const response = await fetch(`/api/${user}/cart/${item}/all`, {
        method: 'DELETE'
    });
    if (response.ok) {
        return dispatch(deleteOne(item));
    }
}

export const editCart = (user, item, data) => async (dispatch) => {
    const response = await fetch(`/api/${user}/cart/${item}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const cart = await response.json();
        dispatch(editOne(cart));
        return cart;
    };
};

const initialState = {};

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = {};
            action.payload.forEach(cart => {
                newState[cart.product_id] = cart
            });
            return newState;
        case ADD_ONE:
            newState = {
                ...state,
                [action.cart.Cart_item.product_id]: action.cart.Cart_item
            };
            return newState;
        case DELETE:
            newState = { ...state };
            delete newState[action.cartId];
            return newState;
        case EDIT:
            newState = { ...state };
            newState[action.cart.product_id] = action.cart;
            return newState;
        default:
            return state;
    };
};

export default cartReducer;
