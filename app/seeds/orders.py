from app.models import db, Order

def seed_orders():
    order1 = Order(user_id=1, items={1:5, 2:5, 3:5}, address="555 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Demo", order_last="Demonstration")
    order2 = Order(user_id=1, items={1:5, 2:5, 3:5}, address="555 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Demo", order_last="Demonstration")
    order3 = Order(user_id=1, items={1:5, 2:5, 3:5}, address="555 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Demo", order_last="Demonstration")
    order4 = Order(user_id=2, address="552 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Jason", order_last="Li")
    order5 = Order(user_id=3, items={2:2, 3:5, 3:5}, address="553 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Sharon", order_last="Fang")
    order6 = Order(user_id=4, items={1:5, 2:5, 3:5}, address="554 Demo", city='Los Angeles', state='CA', zip_code='90006', credit_card="1234123412341234",
    expiration_date="1224", cvc="123", order_first="Paul", order_last="Oh")


    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.add(order5)
    db.session.add(order6)

    db.session.commit()

def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
