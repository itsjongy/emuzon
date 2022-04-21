import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { addCart } from '../../../store/cart';

function AddCart({ user, productId }) {
    const dispatch = useDispatch();
   
    const addToCart = () => {
        dispatch(addCart(user?.id, productId));
    };

    return (
        <div>
            {user?.id ?
                <button className="addToCart__button pointer" onClick={addToCart}>Add to Cart</button>
                :
                <Link to="/login"><button className="addToCart__button pointer">Add to Cart</button></Link>}
        </div>
    );
}

export default AddCart;
