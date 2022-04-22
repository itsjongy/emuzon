import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { editCart } from '../../../store/cart';
import "../CartItem.css";

function EditCartItem({ userId, product_id, quantity }) {
    const dispatch = useDispatch();
    const [itemCount, setItemCount] = useState(quantity);
    const [errors, setErrors] = useState([]);

    const updateItem = () => {
        if (errors.length) return;
        dispatch(editCart(userId, product_id, {
            "quantity": itemCount
        }));
    };

    useEffect(() => {
        const validationErrors = [];
        if (!/^[1-9][0-9]*$/.test(itemCount))
            validationErrors.push("Enter a quantity of 1 or more.");
        if (itemCount > 999)
            validationErrors.push("Order is too large in quantity.");
        setErrors(validationErrors)
    }, [itemCount])

    const changeCount = (e) => {
        setItemCount(e.target.value)
    }

    return (
        <div>
            <div>
                {errors.map((error, ind) => (
                    <div className='cartproduct-error' key={ind}>{error}</div>
                ))}
                <div className="cartproduct-container">
                    <span className="cartproduct-quantity">Qty: </span>
                    <input
                        className="cartproduct-input"
                        type="number"
                        name="item_count"
                        required
                        min="1"
                        onBlur={updateItem}
                        onChange={changeCount}
                        value={itemCount}
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default EditCartItem;
