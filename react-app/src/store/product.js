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
    console.log("response+++++++++++++++++++++", response)
    if (response.ok) {
        const products = await response.json();
        console.log('products------------', products)
        dispatch(load(products));
        return products;
    }
}

export const getProduct = (productId) => async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`);
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
            action.products.forEach(product =>
                newState[product.id] = product)
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
