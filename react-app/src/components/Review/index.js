import { useDispatch } from "react-redux"
import { deleteReview } from "../../store/review";

const Reviews = ({ userReview, reviewInfo }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault()

        dispatch(deleteReview(reviewInfo.user_id, reviewInfo.product_id));
    };

    return (
        <div>
            <div>
                <p>{reviewInfo.user_first_name} {reviewInfo.user_last_name}</p>
            </div>
            <div>
                {Array(5)
                    .fill()
                    .map((_, i) => {
                        let currentRating = i + 1;
                        return (
                            <p key={i}>
                                <i
                                    key={i}
                                    className={`fas fa-star ${currentRating <= reviewInfo.rating
                                            ? `star-yellow`
                                            : `star-gray`
                                        }`}
                                ></i>
                            </p>
                        );
                    })}
            </div>
        </div>
    );
};

export default Reviews;
