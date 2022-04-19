import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getReview } from "../../store/review";
import Reviews from "../Review";
import ReviewDetail from "../ReviewDetails";


const ProductPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(state => state.product)
    const review = useSelector(state => Object.values(state.review));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(getProducts());
            await dispatch(getReview(productId));
        })();
    }, [dispatch, productId]);

    const currentDate = () => {
        let currentDay = new Date();
        const options = { weekday: "long", month: "long", day: "numeric" };

        currentDay.setDate(currentDay.getDate() + 2);
        return currentDay.toLocaleDateString("en-US", options);
    }

    let avgRating =
        review?.reduce(function (sum, value) {
            return sum + value.rating;
        }, 0) / review?.length;

    return (
        <div>
            <div>
                <Link to='/' exact='true'>
                    Home
                </Link>
                <p>{product?.[productId]?.category}</p>
            </div>
            <div>
                <div>
                    <img alt="productpage-logo" className="productpage-image" src={`${product?.[productId]?.product_img}`}></img>
                </div>
                <div>
                    <p>{product?.[productId]?.name}</p>
                    <div>
                        <div>
                            <div>
                                {Array(5).fill().map((_, i) => {
                                    let currentRating = i + 1;
                                    return (
                                        <p key={i}>
                                            <i key={i} className={`fas fa-star ${currentRating <= avgRating ? `star-yellow` : `star-gray`}`}>
                                            </i>
                                        </p>
                                    )
                                })}
                            </div>
                            <p>{review?.length} ratings</p>
                        </div>
                        <div>
                            <p>Price: {`$${product?.[productId]?.price}`}</p>
                            <p>&</p>
                            <p>FREE RETURNS</p>
                        </div>
                        <div>
                            <p>About this item:</p>
                            <p>{product?.[productId]?.description}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p>{`$${product?.[productId]?.price}`}</p>
                    <div>
                        <p>&</p>
                        <p>FREE RETURNS</p>
                    </div>
                    <p>FREE DELIVERY: {currentDate()}</p>
                    {/* Add to cart function here */}
                </div>
            </div>
            <div>
                <div>
                    {avgRating && <ReviewDetail review={review} avgRating={Math.floor(avgRating)} />}
                    {user ? (
                        <NavLink to={`/products/${productId}/new-review`}>Write a customer review</NavLink>
                    ) :
                        <a href="/login">Write a customer review</a>
                    }
                </div>
                <div>
                    {review?.map((userReview) => (
                        <>
                            {console.log("user in html ---->", userReview)}
                            {userReview.body}
                            <div className="review-userinfo">
                                <p>{userReview.user_first_name} {userReview.user_last_name}</p>
                            </div>
                            <div className="review-rating">
                                {Array(5).fill().map((_, i) => {
                                    let currentRating = i + 1;
                                    return (
                                        <p key={i}>
                                            <i
                                                key={i}
                                                className={`fas fa-star ${currentRating <= userReview.rating
                                                    ? `star-yellow`
                                                    : `star-gray`
                                                    }`}
                                            />
                                        </p>
                                    );
                                })}
                                <p className="review-headline">{userReview.headline}</p>
                            </div>
                            <p className="review-date">Reviewed on {userReview.updated_at}</p>
                            <p className="review-body">{userReview.body}</p>
                            {user.id === userReview.user_id &&
                                < Reviews
                                    key={userReview.id}
                                    reviewInfo={userReview}
                                />}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
