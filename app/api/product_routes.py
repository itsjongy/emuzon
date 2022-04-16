from flask import Blueprint, jsonify, request
from app.models import Product, Review, db
from app.forms.review_form import ReviewForm


product_routes = Blueprint('products', __name__)


# ROUTES ALL WORK YEP YEP
# this one gets ALL the products
@product_routes.route('/')
def products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


# this one gets a single product
@product_routes.route('/<int:id>')
def get_product(id):
    product = Product.query.get(id)
    return product.to_dict_single()


# this gets reviews all reviews under a product
@product_routes.route('/<int:id>/reviews')
def get_reviews(id):
    reviews = Review.query.filter(Review.product_id == id).order_by(Review.updated_at.desc()).all()
    reviewList = []
    for review in reviews:
        reviewList.append(review.to_dict())
    return jsonify(reviewList)


#  this adds a review under a product
@product_routes.route('/<int:id>/reviews/new', methods=['POST'])
def add_Review(id):
    review = request.json
    newReview = Review(
        user_id=review['user_id'],
        product_id=review['product_id'],
        headline=review['headline'],
        body=review['body'],
        rating=review['rating'],
    )
    db.session.add(newReview)
    db.session.commit()
    return newReview.to_dict()


# this one edits review under a product
@product_routes.route('/<int:id>/reviews/<int:userId>/edit', methods=['PATCH'])
def editReview(id, userId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        fetchReview = Review.query.filter(Review.product_id == id, Review.user_id == userId).first()
        fetchReview.headline=form.data['headline']
        fetchReview.body=form.data['body']
        fetchReview.rating=form.data['rating']
        db.session.commit()
        return fetchReview.to_dict()
    return 'Error'


# this one deletes review under a product
@product_routes.route('/<int:id>/reviews/<int:userId>/delete', methods=['DELETE'])
def deleteReview(id, userId):
    review = Review.query.filter(Review.product_id == id, Review.user_id == userId).first()
    db.session.delete(review)
    db.session.commit()
    return 'Deleted >:)'
