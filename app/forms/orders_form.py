from flask_wtf import FlaskForm
from wtforms import Field, StringField, IntegerField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    user_id = IntegerField('user_id')
    items = StringField()
    address = StringField('address')
    city = StringField('city')
    state = StringField('state')
    zipCode = StringField('zipCode')
    credit_card = StringField('credit_card')
    expiration_date = StringField('expiration_date')
    cvc = StringField('cvc')
    order_first = StringField('order_first')
    order_last = StringField('order_last')
