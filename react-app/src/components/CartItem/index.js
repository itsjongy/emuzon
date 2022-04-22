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
        <div className='cartitem-container'>
            <Link className='cartitem-imagecontainer' to={`/products/${product_id}`}>
                <img className='cartitem-image' alt="" src={product_img} />
            </Link>
            <div className='cartitem-productinfocontainer'>
                <div className='cartitem-specificcontainer'>
                    <div className='cartitem-productcontainer'>
                        <Link to={`/products/${product_id}`}>
                            <p className='cartitem-productname'>{name}</p>
                        </Link>
                        <p className='cartitem-instock'>In Stock</p>
                        <div className='cartitem-stockcontainer'>
                            <img className='cartitem-primelogo' alt='prime' src='https://m.media-amazon.com/images/G/01/AmazonStores/prime.png'></img>
                            <p className='cartitem-andtext'>&</p>
                            <p className='cartitem-returntext'>FREE Returns</p>
                        </div>
                        <div className='cartitem-buttoncontainer'>
                            <EditCartItem
                                userId={userId}
                                product_id={product_id}
                                quantity={quantity}
                            />
                            <div className='cartitem-seperator'></div>
                            <button className='cartitem-deletebutton' onClick={deleteItem}>Delete</button>
                        </div>
                    </div>
                    <div className='cartitem-pricecontainer'>
                        <p className='cartitem-price'>${price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
