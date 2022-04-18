import { useDispatch } from "react-redux"
import { deleteReview } from "../../store/review";
import "./style/Review.css";

const Reviews = ({ userReview, reviewInfo }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteReview(reviewInfo.user_id, reviewInfo.product_id));
    };

    return (
        <div className="review-container">
            <div className="review-userinfo">
                <p>{reviewInfo.user_first_name} {reviewInfo.user_last_name}</p>
            </div>
            <div className="review-rating">
                {Array(5).fill().map((_, i) => {
                    let currentRating = i + 1;
                    return (
                        <p key={i}>
                            <i
                                key={i}
                                className={`fas fa-star ${currentRating <= reviewInfo.rating
                                    ? `star-yellow`
                                    : `star-gray`
                                    }`}
                            />
                        </p>
                    );
                })}
                <p className="review-headline">{reviewInfo.headline}</p>
            </div>
            <p className="review-date">Reviewed on {reviewInfo.updated_at}</p>
            <p className="review-body">{reviewInfo.body}</p>
            {userReview ? (
                <div className="userReviews_review_buttons">
                    <button
                        className="userReviews_review_buttons_delete pointer"
                        onClick={handleDelete}
                        type="submit"
                    >
                        Delete Your Review
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default Reviews;
