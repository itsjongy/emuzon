const ADD_ONE = 'cart/ADD_ONE';
const LOAD = 'cart/LOAD';
const DELETE = 'cart/DELETE';
const EDIT = 'cart/EDIT';

const addOne = (cart) => ({
    type: ADD_ONE,
    cart
});

const load = (carts) => ({
    type: LOAD,
    carts
});

const deleteOne = (cartId) => ({
    type: DELETE,
    cartId
});

const editOne = (cart) => ({
    type: EDIT,
    cart
});

export const addCart = (user, item) => async (dispatch) => {
    const response = await fetch(`/api/${user}/cart/${item}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item, user)
    });
    if (response.ok) {
        const cart = await response.json();
        dispatch(addOne(cart));
        return cart;
    };
};

export const getCart = (userId) => async (dispatch) => {
    if (userId) {
        const response = await fetch(`/api/${userId}/cart`)
        if (response.ok) {
            const cart = await response.json();
            dispatch(load(cart));
            return cart;
        };
    } else {
        return ['User is not logged in.']
    };
};

export const deleteCart = (user, item) => async (dispatch) => {
    const response = await fetch(`/api/${user}/cart/${item}/all`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const cart = await response.json();
        dispatch(deleteOne(cart))
        return cart;
    };
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
        case ADD_ONE:
            newState = { ...state };
            newState[action.cart.id] = action.cart;
            return newState;
        case LOAD:
            newState = {};
            action.carts.forEach(cart => {
                newState[cart.product_id] = cart
            });
            // console.log("newState", newState)
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
