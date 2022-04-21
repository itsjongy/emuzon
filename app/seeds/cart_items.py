from app.models import db, Cart_item

def seed_cart_items():
    cart1 = Cart_item(
        product_id=1, user_id=1, quantity=1)
    cart2 = Cart_item(
        product_id=2, user_id=1, quantity=1)
    cart3 = Cart_item(
        product_id=3, user_id=1, quantity=1)
    cart4 = Cart_item(
        product_id=1, user_id=2, quantity=1)
    cart5 = Cart_item(
        product_id=2, user_id=2, quantity=1)
    cart6 = Cart_item(
        product_id=3, user_id=3, quantity=1)


    db.session.add(cart1)
    db.session.add(cart2)
    db.session.add(cart3)
    db.session.add(cart4)
    db.session.add(cart5)
    db.session.add(cart6)

    db.session.commit()

def undo_cart_items():
    db.session.execute('TRUNCATE cart_items RESTART IDENTITY CASCADE;')
    db.session.commit()
