from app.models import db, Like
import random
from faker import Faker

def getRandomNumber(num):
    return random.randint(1, num)
    
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_likes():
    first = Like(
        user_id=1,
        image_id=2    
    )
    second = Like(
        user_id=2,
        image_id=1
    )
    third = Like(
        user_id=3,
        image_id=1
    )

    for i in range(1, 30):
        db.session.add(Like(user_id=getRandomNumber(15), image_id=getRandomNumber(40)))

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
