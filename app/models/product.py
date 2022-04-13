from .db import db

class Product(db.Model):
    __tablename__ = "products"

    id= db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(8,2), nullable=False)
    product_img = db.Column(db.String(255), nullable=False, default='https://www.mouldlife.net/ekmps/shops/mouldlife/images/ml20-liquid-rubber-clear-concrete-casting-7771-p.png')
    category = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    users = db.relationship('Cart_item', back_populates='product')
    users_reviews = db.relationship('Review', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': str(self.price),
            'product_img': self.product_img,
            'category': self.category,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
