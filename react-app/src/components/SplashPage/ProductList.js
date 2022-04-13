import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product";
import ProductCard from "../ProductCard";
import './style/ProductList.css'

const ProductsList = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.product);
    useEffect(() => {
        (async () => {
            await dispatch(getProducts());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null
    };

    let productsArr = [];
    const productListMap = () => {
        if (products !== undefined) {
            productsArr = Object.values(products);
            return (
                <>
                    {productsArr?.map((product) => (
                        <ProductCard key={product?.id} product={product ? product : null} />
                    ))}
                </>
            );
        };
    };

    return (
        <div className="products-list-container">
            {productListMap()}
        </div>
    );
};

export default ProductsList;
