import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { deleteReview } from "../../store/review";
import "./style/Review.css";

const Reviews = ({ reviewInfo }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewInfo.user_id, reviewInfo.product_id));
    };
    console.log("hehehehee reviewinfo --->", reviewInfo)

    let addEditButton;
    if (reviewInfo.user_id) {
        addEditButton = (
            <div className="review-add">
                <NavLink to={`/products/${reviewInfo.product_id}/edit-review`}>
                    Edit review
                </NavLink>
            </div>
        )
    } else {
        addEditButton = null;
    };

    return (
        <div className="review-container">
            <div className="userReviews_review_buttons">
                {addEditButton}
                <button
                    className="userReviews_review_buttons_delete pointer"
                    onClick={handleDelete}
                    type="submit"
                >
                    Delete your review
                </button>
            </div>
        </div>
    );
};

export default Reviews;
