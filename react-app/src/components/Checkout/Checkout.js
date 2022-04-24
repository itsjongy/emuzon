import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { getCart } from "../../store/cart";
import { getOrders } from "../../store/order";
import EditAddress from "./EditAddress/EditAddress";

const Checkout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => Object.values(state.cart));
    const order = useSelector(state => Object.values(state.order));
    const user = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false);
    const [addressChange, setAddressChange] = useState(false);
    const [creditCard, setCreditCard] = useState(false);
    const [error, setError] = useState(false);

    const newOrders = order[order.length - 1];

    useEffect(() => {
        dispatch(getCart(user?.id));
        dispatch(getOrders(user?.id));
        setLoaded(true);
    }, [dispatch, user]);

    if (!user) {
        return (
            <Redirect to="/login" />
        )
    };

    const newMoney = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    return (
        <div>
            <div>
                <div>
                    <div>
                        <h3>1</h3>
                        <h3>Shipping Address</h3>
                        <div>
                            <p>
                                {newOrders ? newOrders.order_first : user.first_name}{" "}
                                {newOrders ? newOrders.order_last : user.last_name}
                            </p>
                            <p>
                                {newOrders ? newOrders.address : null}
                            </p>
                            <p>
                                {newOrders?.city ? `${newOrders.city}, ` : null}
                                {newOrders ? newOrders.state : null}
                                {newOrders?.zip_code ? (` ${newOrders.zip_code}`) : (
                                    <span key="checkout-shippingcheck">
                                        Please enter shipping info.
                                    </span>
                                )}
                            </p>
                        </div>
                        <button onClick={() => setAddressChange(true)}>
                            {newOrders?.address ? `Change` : `Add Info`}
                        </button>
                        {addressChange && (
                            <Modal onClose={() => setAddressChange(false)}>
                                <EditAddress
                                    newOrders={newOrders}
                                    setAddressChange={setAddressChange}
                                    currentFirst={user?.first_name}
                                    currentLast={user?.last_name}
                                    userId={user.id}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;
