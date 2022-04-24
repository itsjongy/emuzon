const GET_ORDERS = "orders/GET_ORDERS";
const ADD_ORDERADDRESS = "orders/ADD_ORDERADRESS";
const ADD_ORDERPAYMENT = "orders/ADD_ORDERPAYMENT";
const ADD_ORDERFINAL = "orders/ADD_ORDERFINAL";
const EDIT_ORDERADDRESS = "orders/EDIT_ORDERADDRESS";
const EDIT_ORDERPAYMENT = "orders/EDIT_ORDERPAYMENT";

const showOrders = (orders) => ({
    type: GET_ORDERS,
    payload: orders
});

const newOrderAddress = (payload) => ({
    type: ADD_ORDERADDRESS,
    payload
});

const newOrderPayment = (payload) => ({
    type: ADD_ORDERPAYMENT,
    payload
});

const newOrderFinal = (payload) => ({
    type: ADD_ORDERFINAL,
    payload
});

const updateOrderAddress = (payload) => ({
    type: EDIT_ORDERADDRESS,
    payload
});

const updateOrderPayment = (payload) => ({
    type: EDIT_ORDERPAYMENT,
    payload
});

export const getOrders = (userId) => async (dispatch) => {
    if (userId) {
        const response = await fetch(`/api/orders/${userId}`)
        if (response.ok) {
            const order = await response.json();
            const newOrder = order.user_orders;
            dispatch(showOrders(newOrder));
            return newOrder;
        };
    } else {
        return ["Login required."]
    };
};

export const addOrderAddress = (user_id, address, city, state, zip_code, order_first, order_last) => async (dispatch) => {
    const response = await fetch(`/api/orders/${user_id}/new/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
            address,
            city,
            state,
            zip_code,
            order_first,
            order_last
        })
    });
    if (response.ok) {
        const order = await response.json();
        return dispatch(newOrderAddress(order));
    }
}

export const addOrderPayment = (user_id, credit_card, expiration_date, cvc) => async (dispatch) => {
    const response = await fetch(`/api/orders/${user_id}/new/address`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
            credit_card,
            expiration_date,
            cvc
        })
    });
    if (response.ok) {
        const order = await response.json();
        dispatch(newOrderPayment(order));
        return order;
    };
};

export const addOrderFinal = (user_id, items) => async (dispatch) => {
    const response = await fetch(`/api/orders/${user_id}/new/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
            items
        })
    });
    if (response.ok) {
        const order = await response.json();
        dispatch(newOrderFinal(order));
        return order;
    } else {
        return ["Couldn't process order. Please try again."]
    };
};

export const editOrderAddress = (user_id, address, city, state, zip_code, order_first, order_last) => async (dispatch) => {
    console.log("zipcode----> ", zip_code)
    const response = await fetch(`/api/orders/${user_id}/new/address/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
            address,
            city,
            state,
            zip_code,
            order_first,
            order_last
        })
    });
    console.log("thunk response ----> ", response)
    if (response.ok) {
        const order = await response.json();
        console.log("order in edit thunk ---->", order)
        dispatch(updateOrderAddress(order));
        return order;
    };
};

export const editOrderPayment = (user_id, credit_card, expiration_date, cvc) => async (dispatch) => {
    const response = await fetch(`/api/orders/${user_id}/new/address`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id,
            credit_card,
            expiration_date,
            cvc
        })
    });
    if (response.ok) {
        const order = await response.json();
        dispatch(updateOrderPayment(order));
        return order;
    };
};

const initialState = {};

const orderReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ORDERS:
            newState = {};
            action.payload.forEach(order => (newState[order] = order))
            return newState;
        case ADD_ORDERADDRESS:
            newState = {};
            newState = { ...state, [action.payload.new_address.id]: action.payload.new_address };
            return newState;
        case ADD_ORDERPAYMENT:
            newState = {};
            newState = { ...state, [action.payload.new_payment.id]: action.payload.new_payment };
            return newState;
        case ADD_ORDERFINAL:
            newState = {};
            newState = { ...state, [action.payload.new_order.id]: action.payload.new_order };
            return newState;
        case EDIT_ORDERADDRESS:
            newState = {};
            newState = { ...state, [action.payload.edit_address.id]: action.payload.edit_address };
            return newState;
        case EDIT_ORDERPAYMENT:
            newState = {};
            newState = { ...state, [action.payload.edit_payment.id]: action.payload.edit_payment };
            return newState;
        default:
            return state;
    };
};

export default orderReducer;
