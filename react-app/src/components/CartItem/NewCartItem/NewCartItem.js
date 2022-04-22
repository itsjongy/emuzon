import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addCart } from '../../../store/cart';
import './style/NewCartItem.css';

function AddCart({ user, productId }) {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(addCart(user?.id, productId));
    };

    return (
        <div>
            {user?.id ?
                <button className="addcart-button" onClick={addToCart}>Add to Cart</button>
                :
                <Link to="/login"><button className="addcart-button">Add to Cart</button></Link>}
        </div>
    );
};

export default AddCart;
