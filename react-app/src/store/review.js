const GET_ONE = 'reviews/GET_ONE';
const ADD_ONE = 'reviews/ADD_ONE';
const DELETE_ONE = 'reviews/DELETE_ONE';
const UPDATE_ONE = 'reviews/UPDATE_ONE';

const loadOne = (review) => ({
    type: GET_ONE,
    review
});

const addOne = (review) => ({
    type: ADD_ONE,
    review
});

const deleteOne = (payload) => {
    return {
        type: DELETE_ONE,
        payload
    }
}

const updateOne = (review) => ({
    type: UPDATE_ONE,
    review
});

export const getReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}/reviews`);
    if (response.ok) {
        const review = await response.json();
        dispatch(loadOne(review));
        return review;
    };
};

export const addReview = (payload) => async (dispatch) => {
    const response = await fetch(`/api/products/${payload.product_id}/reviews/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(addOne(review));
        return review;
    };
};

export const deleteReview = (user, item) => async (dispatch) => {
    console.log("thunk user ----> ", user)
    console.log("thunk item ----> ", item)
    await fetch(`/api/products/${item}/reviews/${user}/delete`, {
        method: "DELETE"
    });
    return dispatch(deleteOne(user));
};

export const updateReview = (item, user, headline, body, rating) => async (dispatch) => {
    const response = await fetch(`/api/products/${item}/reviews/${user}/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: item, user_id: user, headline, body, rating }),
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(updateOne(review));
        return review;
    };
};

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ONE:
            newState = {};
            action.review.forEach(revieww => (newState[revieww.id] = revieww));
            return newState;
        case ADD_ONE:
            newState = {};
            newState = { ...state, [action.review.user_id]: action.review }
            return newState;
        case DELETE_ONE:
            newState = { ...state };
            delete newState[action.payload.review.id];
            console.log("delete newstate ===>", newState)
            return newState;
        case UPDATE_ONE:
            newState = { ...state, [action.review.user_id]: action.review }
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
