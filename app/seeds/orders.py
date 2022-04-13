from app.models import db, Order

def seed_orders():
    order1 = Order(user_id=1, items={1:5, 2:5, 3:5}, address="555 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Demo", order_last="Demonstration")
    order2 = Order(user_id=1, items={1:5, 2:5, 3:5}, address="555 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Demo", order_last="Demonstration")

    db.session.add(order1)
    db.session.add(order2)

    db.session.commit()

def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
