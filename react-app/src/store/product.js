const GET_PRODUCTS = 'products/GET_PRODUCTS'
const GET_ONE = 'products/GET_ONE'

const load = (products) => ({
    type: GET_PRODUCTS,
    products
});

const getOne = (product) => ({
    type: GET_ONE,
    product
});

export const getProducts = () => async (dispatch) => {
    const response = await fetch(`/api/products`);
    if (response.ok) {
        const products = await response.json();
        const newProduct = products.products
        dispatch(load(newProduct));
        return newProduct;
    }
}

export const getProduct = (id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`);
    if (response.ok) {
        const product = await response.json();
        dispatch(getOne(product));
        return product;
    }
}

const initialState = {};

const productReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PRODUCTS:
            newState = {};
            action.products.forEach(product => newState[product.id] = product)
            console.log("REDUCER ------>", newState)
            return newState;
        case GET_ONE:
            newState = {};
            newState[action.product.id] = action.product;
            return newState;
        default:
            return state;
    };
};

export default productReducer;
