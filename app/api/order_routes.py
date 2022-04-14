from flask import Blueprint, jsonify, request
from app.models import Order, db
from app.forms.orders_form import OrderForm
from sqlalchemy import or_

order_routes = Blueprint('orders', __name__)


@order_routes.route('/')
def orders():
    orders = Order.query.all()
    return {'orders': [order.to_dict() for order in orders]}


@order_routes.route('/<int:id>')
def get_order(id):
    orders = Order.query.filter(Order.user_id == id).all()
    return {'user_orders': [order.to_dict_single() for order in orders]}

# below routes not working
@order_routes.route('/<int:id>/new/address', methods=['POST','PATCH'])
def newOrderAddress(id):
    existingOrder = Order.query.filter(Order.user_id == id).order_by(Order.id.desc()).first()
    if request.method == 'POST':
        form = OrderForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            order = Order(
                user_id=id,
                address=form.data['address'],
                city=form.data['city'],
                state=form.data['state'],
                zip_code=form.data['zip_code'],
                order_first=form.data['order_first'],
                order_last=form.data['order_last'],
            )
            db.session.add(order)
            db.session.commit()
            return order.to_dict()
    elif request.method == 'PATCH':
        form = OrderForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            existingOrder = Order(
                user_id=id,
                address=form.data['address'],
                city=form.data['city'],
                state=form.data['state'],
                zip_code=form.data['zip_code'],
                order_first=form.data['order_first'],
                order_last=form.data['order_last'],
            )
            db.session.commit()
            return existingOrder.to_dict()
    return "Failed to add or edit address"

@order_routes.route('/<int:id>/new/payment', methods=['POST','PATCH'])
def newOrderPayment(id):
    existingOrder = Order.query.filter(Order.user_id == id).order_by(Order.id.desc()).first()
    if request.method == 'POST':
        form = OrderForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            order = Order(
                user_id=id,
                credit_card=form.data['credit_card'],
                expiration_date=form.data['expiration_date'],
                cvc=form.data['cvc'],
            )
            db.session.add(order)
            db.session.commit()
            return order.to_dict()
    elif request.method == 'PATCH':
        form = OrderForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            order = Order(
                user_id=id,
                credit_card=form.data['credit_card'],
                expiration_date=form.data['expiration_date'],
                cvc=form.data['cvc'],
            )
            db.session.commit()
            return existingOrder.to_dict()
    return "Failed to add or edit payment"

@order_routes.route('/<int:id>/new', methods=['PATCH'])
def newOrder(id):
        existingOrder = Order.query.filter(Order.user_id == id).filter(Order.items == None).first()
        if existingOrder:
            null = Order.query.filter(Order.user_id == id).filter(or_(Order.address == None, Order.credit_card == None)).all()
            if not null:
                form = OrderForm()
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    existingOrder.items = form.data['items']
                    db.session.commit()
                    return {'Added_Order': existingOrder.to_dict()}
            else:
                return {'User needs to fill out shipping or payment'}, 401
        else:
            null = Order.query.filter(Order.user_id == id).filter(or_(Order.address != None, Order.credit_card != None, Order.items != None)).order_by(Order.id.desc()).first()
            if null:
                form = OrderForm()
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    order = Order(
                            user_id=id,
                            address=null.address,
                            city=null.city,
                            state=null.state,
                            zip_code=null.zip_code,
                            order_first=null.order_first,
                            order_last=null.order_last,
                            items=form.data['items'],
                            credit_card=null.credit_card,
                            expiration_date=null.expiration_date,
                            cvc=null.cvc
                            )
                    db.session.add(order)
                    db.session.commit()
                    return order.to_dict()
            return {'User does not have a current order'}, 401
