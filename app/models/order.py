from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.dialects.postgresql import JSON

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    items = db.Column(JSON)
    address = db.Column(db.String(255))
    city = db.Column(db.String(30))
    state = db.Column(db.String(2))
    zip_code = db.Column(db.String(5))
    credit_card = db.Column(db.String(16))
    expiration_date = db.Column(db.String(4))
    cvc = db.Column(db.String(3))
    order_first = db.Column(db.String(30))
    order_last = db.Column(db.String(30))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    users = db.relationship('User', back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': self.items,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'credit_card': self.credit_card,
            'expiration_date': self.expiration_date,
            'cvc': self.cvc,
            'order_first': self.order_first,
            'order_last': self.order_last,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict_single(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': self.items,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'credit_card': self.credit_card,
            'expiration_date': self.expiration_date,
            'cvc': self.cvc,
            'order_first': self.order_first,
            'order_last': self.order_last,
            'user_meta': {'first_name': self.users.first_name, 'last_name': self.users.last_name},
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
