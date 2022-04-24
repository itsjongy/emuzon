import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
    return (
        <div className="checkout-container">
            <p>
                Thank you! Your order has been submitted.
            </p>
            <Link to="/">
                <div className="back-home">Back to home page</div>
            </Link>
        </div>
    )
};

export default Checkout;
