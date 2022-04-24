import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getOrders } from "../../store/order";
import { getProducts } from "../../store/product";

const Order = () => {
    const [loaded, setLoaded] = useState(false);
    const user = useSelector(state => state.session.user);
    const orders = useSelector(state => Object.values(state.order));
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(getProducts())
            await dispatch(getOrders(user?.id))
            setLoaded(true)
        });
    });

    if (!user) return <Redirect to="/login" />;

    return loaded && (
        <div>
            <div>
                <div>
                    <p>Your Account</p>
                    <p>></p>
                    <p>Your Orders</p>
                </div>
            </div>
        </div>
    )
}

export default Order;
