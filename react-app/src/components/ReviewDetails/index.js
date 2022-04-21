import './style/ReviewDetail.css'

function ReviewDetail({ review, avgRating }) {
    const ratingMap = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    review?.forEach((el) => (el.rating in ratingMap) ? ratingMap[el.rating]++ : null)

    return (
        <div className="reviewdetail-container">
            <h2 className='reviewdetail-reviewtext'>Customer reviews</h2>
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
                    {avgRating} out of 5
                </p>
            </div>
            <span className="reviewdetail-totalratings">
                {review?.length} total ratings
            </span>
            <div className='reviewdetail-barcontainer'>
                {Array(5).fill().map((_, index) =>
                    review?.length ? (
                        <div key={`topDiv${index}`} className="reviewdetail-bar">
                            <span className="reviewdetail-numbercount">
                                {index + 1} star
                            </span>
                            <div className="reviewdetail-barouterprogress">
                                <span
                                    className="reviewdetail-barinnerprogress"
                                    style={{
                                        width: `${((ratingMap[index + 1] / review.length) * 100).toFixed()}%`,
                                    }}
                                ></span>
                            </div>
                            <span className="reviewdetail-numbercount2">
                                {review?.length
                                    ? ((ratingMap[index + 1] / review?.length) * 100).toFixed()
                                    : 0}{" "}
                                %
                            </span>
                        </div>
                    ) : (
                        <div key={`topDiv${index}`} className="reviewdetail-bar">
                            <span className="reviewdetail-numbercount">
                                {index + 1} star
                            </span>
                            <div className="reviewdetail-barouterprogress">
                                <span
                                    className="reviewdetail-barinnerprogress"
                                    style={{
                                        width: `0%`,
                                    }}
                                ></span>
                            </div>
                            <span className="reviewdetail-numbercount2">
                                0%
                            </span>
                        </div>
                    )
                )
                    .reverse()}
            </div>
        </div>
    );
}

export default ReviewDetail;
