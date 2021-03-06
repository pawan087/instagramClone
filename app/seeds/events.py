from app.models import db, Event
import random
from faker import Faker

def getRandomNumber(num):
    return random.randint(1, num)
    
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_events():
    first = Event(
        our_user_id=1,
        other_user_id=2,
        message="liked an image you posted",
        image_id='1'
    )
    second = Event(
        our_user_id=2,
        other_user_id=1,
        message="liked an image you posted",
        image_id=2
    )
    third = Event(
        our_user_id=1,
        other_user_id=3,
        message="liked an image you posted",
        image_id=1
    )

    for i in range(1, 15):
        db.session.add(Event(our_user_id=getRandomNumber(15), other_user_id=getRandomNumber(15), message="liked an image you posted", image_id=getRandomNumber(40)))

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
