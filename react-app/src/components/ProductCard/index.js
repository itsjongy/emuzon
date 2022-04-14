import { NavLink } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <NavLink className='product-card-container' exact to={`products/${product?.id}`}>
            <div>
                <img className='product-image' src={product?.img} alt='product' />
                <p className='product-card-name'>{product?.name}</p>
                <p className='product-card-price'>{product?.price}</p>
                <div></div>
            </div>
        </NavLink>
    )
}

export default ProductCard;
