import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../../store/review";
import '../ReviewModal.css'

const CreateReview = ({ productId, user, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [headline, setHeadline] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        let validateErrors = [];
        if (!headline) validateErrors.push("Please enter a title.")
        if (!body) validateErrors.push("Please enter a review.")

        setValidationErrors(validateErrors);
    }, [headline, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        errors = validate();
        if (errors.length) return setValidationErrors(errors);
        else {
            const data = await dispatch(addReview(productId, user.id, headline, body, rating));
            setShowModal(false);
            if (data) {
                setErrors(data);
            };
        };
    };

    const updateHeadline = (e) => {
        setHeadline(e.target.value);
    };

    const updateBody = (e) => {
        setBody(e.target.value);
    };

    const updateRating = (e) => {
        setRating(e.target.value);
    };

    return (
        <form>
            <div>
                <p>Create review</p>
                {validationErrors.length > 0 && (
                    <div>
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
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
                        onChange={updateRating}
                        value={rating}
                    ></input>
                    <label className="reviewImgText" htmlFor="reviewImage">Leave a photo review:</label>
                    <input onChange={updateReviewImg} className="reviewImgText" type="file" id="avatar" name="reviewImage" accept="image/png, image/jpeg"></input>
                </div>
                <div>
                    <p>Add a headline</p>
                    <textarea
                        name="headline"
                        placeholder="What's most important to know?"
                        onChange={updateHeadline}
                        value={headline}
                    />
                </div>
                {/* <div>
                    maybe add an image adder here???
                    <p>Add a photo or video</p>
                    <p>Shoppers find images and vides more helpful than text alone.</p>

                </div> */}
                <div>
                    <textarea
                        name="body"
                        placeholder="What did you like or dislike? What did you use this product for?"
                        onChange={updateBody}
                        value={body}
                    ></textarea>
                </div>
            </div>
            <button onClick={handleSubmit} type="submit" className="review-submit">
                Submit
            </button>
        </form>
    )
}

export default CreateReview;
