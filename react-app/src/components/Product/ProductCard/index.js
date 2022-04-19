import React from 'react';
import { Link } from "react-router-dom";
import './style/ProductCard.css';

const ProductCard = ({ name, price, product_img, rating, id: item }) => {

    const avgRating = rating;
    console.log("splash page rating", rating);

    let length;
    if (name.length < 50) {
        length = (
            <img className='product-card-image' src={product_img} alt='product' />
        )
    } else {
        length = (
            <img className='product-card-image2' src={product_img} alt='product2' />
        )
    }

    return (
        <Link className='product-card-link' to={`/products/${item}`}>
            <div className='product-card-container'>
                <div className='product-image-container'>
                    {length}
                </div>
                <div className='product-card-info'>
                    <p className='product-card-name'>{name}</p>
                    <p className='product-card-price'>${price}</p>
                    <div className="product-card-rating">
                        {Array(5).fill().map((_, i) => {
                            let currentRating = i + 1
                            return (
                                <p key={i}>
                                    <i key={i} className={`fas fa-star ${currentRating <= avgRating ? `star-yellow` : `star-gray`}`}></i>
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
