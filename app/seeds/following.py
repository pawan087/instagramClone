from app.models import db, Following


# Adds a demo user, you can add other users here if you want
def seed_following():
    one = Following(
        user_id=1,
        user_follows_id=2
    )

    db.session.add(one)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_following():
    db.session.execute('TRUNCATE following RESTART IDENTITY CASCADE;')
    db.session.commit()
