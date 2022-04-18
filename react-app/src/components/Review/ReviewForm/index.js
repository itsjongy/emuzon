import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProduct } from "../../../store/product";
import { addReview, updateReview } from "../../../store/review";

const ReviewForm = ({ productId, userId, editReviewForm, review }) => {
    const dispatch = useDispatch();
    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(1);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log("productId, userId", productId, userId)
    useEffect(() => {
        let errors = [];
        if (headline) {
            if (headline.length > 100) errors.push('Headline is too long');
        };
        if (!headline) errors.push('Please enter a headline.');
        if (!body) errors.push('Please enter a description.');

        setErrors(errors);
    }, [headline, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (errors.length) return;
        if (editReviewForm) {
            const editedReview = {
                id: review.id,
                user_id: userId,
                product_id: productId,
                headline,
                body,
                rating
            };
            dispatch(updateReview(editedReview));
            return;
        };

        const newReview = {
            user_id: userId,
            product_id: productId,
            headline,
            body,
            rating
        };
        console.log("newReview----->", newReview)
        dispatch(addReview(newReview));
        dispatch(getProduct(productId));
    };

    return (
        <form>
            <div>
                <p>Create review</p>
                {hasSubmitted && errors?.map((error) => (
                    <p>{error}</p>
                ))}
                <div>
                    <div className="review_ratings">
                        {Array(5)
                            .fill()
                            .map((_, i) => (
                                <span key={i}>{i + 1}</span>
                            ))}
                    </div>
                    <input
                        type="range"
                        name="rating"
                        placeholder="rating"
                        min="1"
                        max="5"
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                    ></input>
                </div>
                <div>
                    <p>Add a headline</p>
                    <input
                        type="text"
                        defaultValue={review ? review.headline : ""}
                        placeholder="What's most important to know?"
                        onChange={(e) => setHeadline(e.target.value)}
                        className="reviewform-titleinput"
                    ></input>
                </div>
                <div>
                    <textarea
                        placeholder="What did you like or dislike? What did you use this product for?"
                        defaultValue={review ? review.body : ""}
                        rows={10}
                        columns={10}
                        style={{ resize: "None" }}
                        onChange={(e) => setBody(e.target.value)}
                        className="reviewform-descinput"
                    />
                </div>
            </div>
            <button onClick={handleSubmit} type="submit" className="review-submit">Submit</button>
        </form>
    )
}

export default ReviewForm;
