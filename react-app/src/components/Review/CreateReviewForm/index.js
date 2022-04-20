import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReview } from "../../../store/review";
import "./style/CreateReviewForm.css";

const NewReviewForm = () => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();

    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(1);
    let [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    const validate = () => {
        const validateErrors = [];
        if (!headline) validateErrors.push("Enter a headline.")
        if (headline) {
            if (headline.length > 100) validateErrors.push('Headline is too long');
        };
        if (!body) validateErrors.push('Please enter a description.')
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        errors = validate();
        if (errors?.length) return setValidationErrors(errors);
        else {
            const payload = {
                user_id: user.id,
                product_id: productId,
                headline,
                body,
                rating
            }
            if (payload) {
                dispatch(addReview(payload))
                history.push(`/products/${productId}`)
            }
        };
    }

    return (
        <form>
            <div>
                <p>Create review</p>
                <ul>
                    {validationErrors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
                <div>
                    <p>Overall rating</p>
                    <div className="review_ratings">
                        {Array(5).fill().map((_, i) => (
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
                        placeholder="What's most important to know?"
                        onChange={(e) => setHeadline(e.target.value)}
                        className="reviewform-titleinput"
                    ></input>
                </div>
                <div>
                    <p>Add a written review</p>
                    <textarea
                        placeholder="What did you like or dislike? What did you use this product for?"
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
};

export default NewReviewForm;
