import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { deleteReview } from "../../store/review";
import "./style/Review.css";

const Reviews = ({ reviewInfo }) => {
    const dispatch = useDispatch();
    console.log("reviewinfo----->", reviewInfo)
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewInfo.id));
    };

    let addEditButton;
    if (reviewInfo.user_id) {
        addEditButton = (
            <div className="review-add">
                <NavLink to={`/products/${reviewInfo.product_id}/${reviewInfo.id}/edit-review`}>
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
