import React from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "../../store/cart";
import EditCartItem from "./EditCartItem/EditCartItem";
import './CartItem.css';

const CartItem = ({ id: product_id, userId, product_img, name, price, total_rating, rating_length, quantity }) => {
    const dispatch = useDispatch();

    const deleteItem = () => {
        dispatch(deleteCart(userId, product_id));
    }

    return (
        <div>
            <Link to={`/products/${product_id}`}>
                <img alt="" className="cartProduct__image" src={product_img} />
            </Link>
            <div>
                <p>{name}</p>
                <p>In Stock</p>
                <img alt='prime' src='https://m.media-amazon.com/images/G/01/AmazonStores/prime.png'></img>
                <p>&</p>
                <p>FREE Returns</p>
                <div>
                    <p>$</p>
                    <p>{price}</p>
                </div>
                <EditCartItem
                    userId={userId}
                    product_id={product_id}
                    quantity={quantity}
                />
                <button onClick={deleteItem}>Delete</button>
            </div>
        </div>
    )
}

export default CartItem;
