import React from 'react';
import { Link } from "react-router-dom";
import './style/ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link className='product-card-link' to={`/products/${product?.id}`}>
            <div>
                <img className='product-image' src={product?.product_img} alt='product' />
                <p className='product-card-name'>{product?.name}</p>
                <p className='product-card-price'>${product?.price}</p>
                <div></div>
            </div>
        </Link>
    );
};

export default ProductCard;
