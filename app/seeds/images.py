from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    first = Image(
        title='Demo Title',
        caption='A WHITE WOMANS INSTAGRAM',
        img_url='https://images.ctfassets.net/j95d1p8hsuun/4aiPgnMp3CrvZ39oQqQnHE/34aed6174b535f280ff21de1d0140d85/Shattered-Obelisk-thumb.jpg',
        user_id=1    
    )

    db.session.add(first)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
