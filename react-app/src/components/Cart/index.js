import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteCart, getCart } from "../../store/cart";
import CartItem from "../CartItem";
import './style/Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const cartItems = useSelector(state => Object.values(state.cart));
    const [loaded, setLoaded] = useState(false);

    // delete and reformat later
    const emptyCart = () => {
        Object.values(cartItems).forEach((each) =>
            dispatch(deleteCart(each.user_id, each.product_id))
        );
    }

    useEffect(() => {
        (async () => {
            if (!user) {
                return (
                    <Redirect to="/login" />
                )
            } else {
                dispatch(getCart(user?.id));
                setLoaded(true);
            }
        })();
    }, [dispatch, user]);

    const conversion = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const subtotal = Object.keys(cartItems).reduce(function (previous, key) {
        return previous + parseFloat((cartItems[key]?.product_info?.price) * cartItems[key]?.quantity);
    }, 0.00);

    return (
        <div className="cart-pagecontainer">
            <div className="cart-page">
                <div className="cart-container">
                    {loaded && cartItems.length > 0 ?
                        <div className="cart-textcontainer">
                            <p className="cart-shoppingcarttext">Shopping Cart</p>
                            <div className="cart-linebreak"></div>
                        </div>
                        :
                        <div></div>
                    }
                    <div>
                        {loaded ? [
                            cartItems.length > 0 ? (
                                cartItems.map((each) => (
                                    <div className="hehe" key={"" + each.product_id}>
                                        <CartItem
                                            key={each.product_id}
                                            id={each.product_id}
                                            product_img={each.product_info?.product_img}
                                            name={each.product_info?.name}
                                            price={each.product_info?.price}
                                            total_rating={each.product_info?.average_rating_total}
                                            rating_length={each.product_info?.average_rating_length}
                                            quantity={each.quantity}
                                            userId={user?.id}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div key="asd" className="cart-noitems">
                                    <h1>Your Amazon Cart is empty.</h1>
                                    <p className="cart-noitemstext">Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                                        Continue shopping on the Amazon.com homepage, learn about today's deals, or visit your Wish List.</p>
                                </div>
                            ),
                        ] : null}
                    </div>
                </div>
                <div>
                    {loaded && cartItems.length > 0 ?
                        <div className="cart-subtotalcontainer">
                            <div className="cart-subtotal">
                                <p className="cart-subtotaltext">
                                    Subtotal (
                                    {Object.keys(cartItems).reduce(function (previous, key) {
                                        return previous + cartItems[key].quantity;
                                    }, 0)}{" "}
                                    items):
                                </p>
                                <p className="cart-subtotalnumber">{conversion.format(subtotal)}</p>
                            </div>
                            {cartItems.length > 0 && <Link to="/checkout">
                                <button onClick={emptyCart} className="cart-checkoutbutton">Proceed to checkout</button>
                            </Link>}
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;
