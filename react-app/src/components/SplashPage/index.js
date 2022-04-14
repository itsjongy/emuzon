// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProducts } from "../../store/product";
// import ProductCard from "../ProductCard";
// import './style/index.css';

// const SplashPage = () => {
//     const [loaded, setLoaded] = useState(false);
//     const dispatch = useDispatch();
//     const products = useSelector(state => Object.values(state.products));
//     console.log('--------------', products)
//     useEffect(() => {
//         (async () => {
//             await dispatch(getProducts());
//             setLoaded(true);
//         })();
//     }, [dispatch]);

//     if (!loaded) {
//         return null;
//     };

//     return (
//         <div>
//             <ProductCard />
//         </div>
//     )
// }

// export default SplashPage;
