import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { deleteReview, getReview } from "../../store/review";
import "./style/Review.css";

const Reviews = ({ reviewInfo }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewInfo.user_id, reviewInfo.product_id));
        await dispatch(getReview(reviewInfo.product_id))
    };

    let addEditButton;
    if (reviewInfo.user_id) {
        addEditButton = (
            <div >
                <NavLink
                    className="review-add"
                    to={`/products/${reviewInfo.product_id}/${reviewInfo.id}/edit-review`}
                >
                    Edit review
                </NavLink>
            </div>
        )
    } else {
        addEditButton = null;
    };

    return (
        <div className="review-container">
            <div className="review-userbuttons">
                {addEditButton}
                <div className="review-seperator"></div>
                <button
                    className="review-deletebutton"
                    onClick={handleDelete}
                    type="submit"
                >
                    Delete review
                </button>
            </div>
        </div>
    );
};

export default Reviews;
