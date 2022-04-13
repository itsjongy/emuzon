from app.models import db, Product

def seed_products():
    product1 = Product(
        name='Amazon Basics 4 Pack 9 Volt Performance All-Purpose Alkaline Batteries, 5-Year Shelf Life',
        description="4-pack of 9-volt alkaline batteries for reliable performance across a wide range of devices",
        price="11.81",
        category="Tech",
        product_img="https://m.media-amazon.com/images/I/71EYDHMLunL._AC_SX679_.jpg"
        )
    product2 = Product(
        name='adidas Originals unisex-adult Trefoil Crew Socks (6-pair)',
        description="Moisture-wicking keeps your feet dry from sweat.",
        price="18.07",
        category="Clothing",
        product_img="https://m.media-amazon.com/images/I/71hED83tTlL._AC_UX679_.jpg"
        )
    product3 = Product(
        name='Tylenol Rapid Release Gels (290 ct.)',
        description="Acetaminophen that releases quickly.",
        price="24.69",
        category="Health",
        product_img="https://m.media-amazon.com/images/I/61-sbCMZNrL._AC_SX466_.jpg"
        )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
