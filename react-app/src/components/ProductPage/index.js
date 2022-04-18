import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getReview } from "../../store/review";
import Reviews from "../Review";
import ReviewDetail from "../ReviewDetails";


const ProductPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const product = useSelector(state => state.product)
    const review = useSelector(state => Object.values(state.review));
    console.log("reviews ---->", review[0])
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

    const avgRating =
        review[0]?.reduce(function (sum, value) {
            return sum + value.rating;
        }, 0) / review[0]?.length;

    const userReview = review[0]?.some((review) => review.user_id === user?.id);
    console.log("00000000", userReview)

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
                            {/* <div>
                                {Array(5)
                                    .fill()
                                    .map((_, i) => {
                                        let currentRating = i + 1;
                                        return (
                                            <p key={i}>
                                                <i key={i} className={`fas fa-star ${currentRating <= avgRating ? `star-yellow` : `star-gray`}`}>
                                                </i>
                                            </p>
                                        );
                                    })};
                            </div> */}
                            <p>{review[0]?.length} ratings</p>
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
                    <ReviewDetail review={review} averageRating={avgRating} />
                </div>
                <div>
                    {review[0]?.filter((ele) => ele.user_id === user?.id).concat(review.filter(reviewfilter => reviewfilter.user_id !== user?.id)).map((userreview) => (
                        <Reviews
                            userReview={userreview.user_id === user?.id}
                            key={userreview.user_id}
                            reviewInfo={userreview}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
