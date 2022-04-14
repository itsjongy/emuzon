import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../../store/review";
import '../ReviewModal.css'

const CreateReview = ({ productId, user }) => {
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

        setErrors(errors);
    }, [headline, body]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        errors = validate();
        if (errors.length) return setErrors(errors);
        else {
            const data = await dispatch(addReview(productId, user.id, headline, body, rating));
            setShowModal(false);
            if (data) {
                set
            }
        }
    }

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

    )
}

export default CreateReview;
