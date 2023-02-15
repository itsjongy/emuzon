from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart_item(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    product = db.relationship('Product', back_populates='users')
    user = db.relationship('User', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product_info': self.product.to_dict(),
            'user_id': self.user_id,
            'quantity': self.quantity,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
