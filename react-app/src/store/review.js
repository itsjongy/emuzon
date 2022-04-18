const GET_REVIEWS = 'reviews/GET_REVIEWS';
const GET_ONE = 'reviews/GET_ONE';
const ADD_ONE = 'reviews/ADD_ONE';
const DELETE_ONE = 'reviews/DELETE_ONE';
const UPDATE_ONE = 'reviews/UPDATE_ONE';


const load = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const loadOne = (review) => ({
    type: GET_ONE,
    review
});

const addOne = (review) => ({
    type: ADD_ONE,
    review
});

const deleteOne = (review) => ({
    type: DELETE_ONE,
    review
});

const updateOne = (review) => ({
    type: UPDATE_ONE,
    review
});

export const getReviews = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews;
    };
};

export const getReview = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}/reviews`);
    if (response.ok) {
        const review = await response.json();
        dispatch(loadOne(review));
        return review;
    };
};

export const addReview = (product_id, user_id, headline, body, rating) => async (dispatch) => {
    const response = await fetch(`/api/products/${product_id}/reviews/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id, user_id, headline, body, rating })
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(addOne(review));
        return review;
    };
};

export const deleteReview = (user, item) => async (dispatch) => {
    const response = await fetch(`/api/products/${item}/reviews/${user}/delete`, {
        method: "DELETE"
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(deleteOne(review));
        return review;
    };
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
        case GET_REVIEWS:
            newState = {};
            action.reviews.forEach(review => (newState[review.id] = review));
            return newState;
        case GET_ONE:
            newState = {};
            newState[action.review.id] = action.review;
            return newState;
        case ADD_ONE:
            newState = {};
            newState = { ...state, [action.review.user_id]: action.review }
            return newState;
        case DELETE_ONE:
            newState = { ...state };
            delete newState[action.review];
            return newState;
        case UPDATE_ONE:
            newState = { ...state, [action.review.user_id]: action.review }
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;
