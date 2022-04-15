from flask import Blueprint, jsonify, request
from app.models import Product, Review, db


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products():
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}


@product_routes.route('/<int:id>')
def get_product(id):
    product = Product.query.get(id)
    return product.to_dict_single()


@product_routes.route('/<int:id>/reviews')
def get_reviews(id):
    reviews = Review.query.filter(Review.product_id == id).order_by(Review.updated_at.desc()).all()
    reviewList = []
    for review in reviews:
        reviewList.append(review.to_dict())
    return jsonify(reviewList)

# create/delete working maybe???
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


@product_routes.route('/<int:id>/reviews/<int:userId>/delete', methods=['DELETE'])
def deleteReview(id):
    # data = dict(request.json)
    review = Review.query.get(id)
    res = {'id': id}
    db.session.delete(review)
    db.session.commit()
    return res
