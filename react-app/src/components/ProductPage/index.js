import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getProducts } from "../../store/product";
import { getReview } from "../../store/review";
import AddCart from "../CartItem/NewCartItem/NewCartItem";
import Reviews from "../Review";
import ReviewDetail from "../ReviewDetails";
import "./style/ProductPage.css";

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

    const reviewExists = review?.some((review) => review.user_id === user?.id);

    return (
        <div>
            <div className="productpage-categories">
                <Link style={{ color: "#565959" }} to='/' exact='true'>
                    <p className="productpage-home">Home</p>
                </Link>
                <p>></p>
                <p>{product?.[productId]?.category}</p>
            </div>
            <div className="productpage-productcontainer">
                <div className="productpage-imagecontainer">
                    <img alt="productpage-logo" className="productpage-image" src={`${product?.[productId]?.product_img}`}></img>
                </div>
                <div className="productpage-productinfocontainer">
                    <p className="productpage-productname">{product?.[productId]?.name}</p>
                    <div className="productpage-productinfostuff">
                        <div className="productpage-ratingcontainer">
                            <div className="productpage-rating">
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
                            <p className="productpage-ratingnum">{review?.length} ratings</p>
                        </div>
                        <div className="productpage-pricecontainer">
                            <p className="productpage-pricetag">$</p>
                            <p className="productpage-price">{`${product?.[productId]?.price}`}</p>
                        </div>
                        <div className="productpage-returncontainer">
                            <p className="productpage-returnand">&</p>
                            <p className="productpage-returnfree">FREE Returns</p>
                        </div>
                        <div>
                            <p className="productpage-productabout">About this item:</p>
                            <ul>
                                <li className="productpage-productdesc">{product?.[productId]?.description}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="productpage-productrightcont">
                    <div className="productpage-rpricecontainer">
                        <p className="productpage-pricetag">$</p>
                        <p className="productpage-price">{`${product?.[productId]?.price}`}</p>
                    </div>
                    <div className="productpage-returncontainer">
                        <p className="productpage-returnand2">&</p>
                        <p className="productpage-returnfree2">FREE Returns</p>
                    </div>
                    <p className="productpage-deliveryfree">FREE delivery: {currentDate()}</p>
                    <AddCart user={user} productId={productId} />
                </div>
            </div>
            <hr className="productpage-divider"></hr>
            <div className="productpage-wholereviewcontainer">
                <div className="productpage-reviewstuff">
                    {avgRating ? (
                        <div>
                            {avgRating && <ReviewDetail review={review} avgRating={Math.floor(avgRating)} />}
                            <hr className="productpage-reviewstuffdivider"></hr>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className="product-page-createreviewcontainer">
                        <h3>Review this product</h3>
                        <p className="productpage-createreviewtext">Share your thoughts with other customers</p>
                        <div className="productpage-createcontainer">
                            {user ? [
                                reviewExists ? null : (
                                    <NavLink className="productpage-createreviewbutton" to={`/products/${productId}/new-review`}>Write a customer review</NavLink>
                                ),
                            ] :
                                <a className="productpage-createreviewbutton" href="/login">Write a customer review</a>
                            }
                        </div>
                    </div>
                </div>
                <div className="productpage-reviewcontainer">
                    <p className="productpage-allreviewtext">Reviews of the product</p>
                    {review?.reverse().map((userReview) => (
                        <div className="productpage-specificrevcontainer">
                            <div>
                                <div className="productpage-reviewuserinfo">
                                    <p className="productpage-reviewuser">{userReview.user_first_name} {userReview.user_last_name}</p>
                                </div>
                                <div className="productpage-rating">
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
                                    <p className="productpage-reviewheadline">{userReview.headline}</p>
                                </div>
                                <p className="productpage-reviewdate">Reviewed on {userReview.updated_at}</p>
                                <p className="productpage-reviewbody">{userReview.body}</p>
                                {user && user.id === userReview.user_id &&
                                    < Reviews
                                        key={userReview.id}
                                        reviewInfo={userReview}
                                    />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default ProductPage;
