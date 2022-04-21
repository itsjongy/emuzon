from app.models import db, Product

def seed_products():
    product1 = Product(
        name='Amazan Basics 4 Pack 9 Volt Performance All-Purpose Alkaline Batteries, 5-Year Shelf Life',
        description="4-pack of 9-volt alkaline batteries for reliable performance across a wide range of devices",
        price="11.81",
        category="Electronics",
        product_img="https://m.media-amazon.com/images/I/71EYDHMLunL._AC_SX679_.jpg"
        )
    product2 = Product(
        name='adidas Originals unisex-adult Trefoil Crew Socks (6-pair)',
        description="Moisture-wicking keeps your feet dry from sweat.",
        price="18.07",
        category="Fashion",
        product_img="https://m.media-amazon.com/images/I/71hED83tTlL._AC_UX679_.jpg"
        )
    product3 = Product(
        name='Tylenol Rapid Release Gels (290 ct.)',
        description="Acetaminophen that releases quickly.",
        price="24.69",
        category="Beauty & Health",
        product_img="https://m.media-amazon.com/images/I/71XLNRnDYRS._AC_SX679_.jpg"
        )
    product4 = Product(
        name='The Original Slinky Walking Spring Toy',
        description="There is only one Original Slinky Brand Celebrate 75 years of wiggly-jiggly fun with Slinky Generations of children and adults have loved playing with Slinky.",
        price="3.50",
        category="Toys & Games",
        product_img="https://m.media-amazon.com/images/I/91jLIfnfDnL._AC_SX679_.jpg"
        )
    product5 = Product(
        name='Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        description="No matter your goals, Atomic Habits offers a proven framework for improving - every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        price="11.99",
        category="Books",
        product_img="https://m.media-amazon.com/images/I/513Y5o-DYtL.jpg"
        )
    product6 = Product(
        name='Tevlaphee Steering Wheel Lock for Cars',
        description="Tevlaphee patented self-locking feature locks with one pull. Easy to handle, install and remove. Simple to lock and unlock with keys in seconds.",
        price="33.14",
        category="Automotive",
        product_img="https://m.media-amazon.com/images/I/71ZiZd8jSrL._AC_SX466_.jpg"
        )
    product7 = Product(
        name='Amazan Essentials Men Long-Sleeve Soft Touch Cardigan Sweater',
        description="Comfortable and versatile, this sweater is perfect on its own or as a layer under a blazer or jacket",
        price="32.80",
        category="Fashion",
        product_img="https://m.media-amazon.com/images/I/A1vU5YWUKDL._AC_UY550_.jpg"
        )
    product8 = Product(
        name='Wyze Cam v3 with Color Night Vision',
        description="An all-new Starlight Sensor records night time video in full, vivid color. The Starlight Sensor can see full color in environments up to 25x darker than traditional video cameras and the new f/1.6 aperture captures 2x more light.",
        price="35.98",
        category="Electronics",
        product_img="https://m.media-amazon.com/images/I/61Jqml2u9qL._AC_SX466_.jpg"
        )
    product9 = Product(
        name='Mighty Patch Original from Hero Cosmetics',
        description="The Original Award-Winning Acne Patch – Mighty Patch is a hydrocolloid sticker that improves the look of pimples overnight without the popping. Just stick it on, get some sleep, and wake up with clearer-looking skin.",
        price="12.99",
        category="Beauty & Health",
        product_img="https://m.media-amazon.com/images/I/41O3SOVUBJL._SX466_.jpg"
        )


    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)

    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
