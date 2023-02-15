from .db import db, environment, SCHEMA, amazan_project

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(amazan_project('users.id')), primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(amazan_project('products.id')), primary_key=True)
    headline = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    product = db.relationship('Product', back_populates='users_reviews')
    user = db.relationship('User', back_populates='products_reviews')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_first_name': self.user.first_name,
            'user_last_name': self.user.last_name,
            'product_id': self.product_id,
            'headline': self.headline,
            'body': self.body,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
