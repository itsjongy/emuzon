from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Demo', email='demooo@aa.io', password='password')
    jason = User(
        first_name='Jason', last_name='Li', email='jasonli@aa.io', password='password')
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharonfa@aa.io', password='password')
    paul = User(
        first_name='Paul', last_name='Oh', email='pauloh@aa.io', password='password')
    chris = User(
        first_name='Chris', last_name='Tsang', email='christs@aa.io', password='password')

    db.session.add(demo)
    db.session.add(jason)
    db.session.add(sharon)
    db.session.add(paul)
    db.session.add(chris)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
