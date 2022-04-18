import './style/ReviewDetail.css'

function ReviewDetail({ review, avgRating }) {
    const ratingMap = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    review[0]?.forEach((el) => (el.rating in ratingMap) ? ratingMap[el.rating]++ : null)

    return (
        <div className="reviewdetail-container">
            <p>Reviews</p>
            <div className="reviewdetail-rating">
                {Array(5).fill().map((_, i) => {
                    let currentRating = i + 1;
                    return (
                        <p key={i}>
                            <i
                                key={i}
                                className={`fas fa-star ${currentRating <= avgRating
                                    ? `star-yellow`
                                    : `star-gray`}`}
                            />
                        </p>
                    );
                })}
                <p className="reviewdetail-avgrating">
                    {avgRating ? Math.floor(avgRating) : 0} out of 5
                </p>
            </div>
            <span className="reviewdetail-totalRatings">
                {review.length} total ratings
            </span>
            {Array(5).fill().map((_, index) =>
                review.length ? (
                    <div
                        key={`topDiv${index}`}
                        className="reviewdetail_indivBreakdown"
                    >
                        <span className="reviewdetail-smallText">
                            {index + 1} star
                        </span>
                        <div className="reviewdetail-indivBreakdown-outerProgress">
                            <span
                                className="reviewdetail-indivBreakdown-innerProgress"
                                style={{
                                    width: `${((ratingMap[index + 1] / review.length) * 100).toFixed()}%`,
                                }}
                            ></span>
                        </div>
                        <span className="reviewdetail-smallText">
                            {review.length
                                ? ((ratingMap[index + 1] / review.length) * 100).toFixed()
                                : 0}{" "}
                            %
                        </span>
                    </div>
                ) : (
                    <div
                        key={`topDiv${index}`}
                        className="reviewdetail_indivBreakdown"
                    >
                        <span className="reviewdetail-smallText">
                            {index + 1} star
                        </span>
                        <div className="reviewdetail-indivBreakdown-outerProgress">
                            <span
                                className="reviewdetail-indivBreakdown-innerProgress"
                                style={{
                                    width: `0%`,
                                }}
                            ></span>
                        </div>
                        <span className="reviewdetail-smallText">
                            0%
                        </span>
                    </div>
                )
            )
                .reverse()}
        </div>
    );
}

export default ReviewDetail;
