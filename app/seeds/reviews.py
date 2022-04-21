from app.models import db, Review

def seed_reviews():
    review1 = Review(
        user_id=1,
        product_id=1,
        headline="Issues with batteries",
        body="These batteries suck! They lasted 1 hour at most >:(",
        rating=1
        )
    review2 = Review(
        user_id=1,
        product_id=2,
        headline="Love these socks",
        body="Very cute very warm",
        rating=5
        )
    review3 = Review(
        user_id=1,
        product_id=3,
        headline="Ease pain ASAP",
        body="Can't survive without these! They're so useful",
        rating=4
        )
    review4 = Review(
        user_id=2,
        product_id=1,
        headline="batteries suck",
        body="stop using batteries",
        rating=1
        )
    review5 = Review(
        user_id=3,
        product_id=1,
        headline="Love these!",
        body="Great batteries",
        rating=5
        )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
