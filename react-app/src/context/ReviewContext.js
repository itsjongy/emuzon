import { createContext, useState, useContext } from 'react';

export const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);

export const ReviewProvider = (props) => {
    const [currentReview, setCurrentReview] = useState(null);

    return (
        <ReviewContext.Provider
            value={{
                currentReview,
                setCurrentReview
            }}
        >
            {props.children}
        </ReviewContext.Provider>
    )
};
