from app.models import db, Image
from .anime_images import images
from faker import Faker
import random

fake = Faker()

def getRandomUser():
    return random.randint(1, 15)

# Adds a demo user, you can add other users here if you want
def seed_images():
    first = Image(
        caption='Still need to watch this movie man...',
        img_url='https://media.newyorker.com/photos/59097fd82179605b11ad9782/master/w_2560%2Cc_limit/Alt-Your-Name.jpg',
        user_id=1,
        hashtags = ["your_name", "anime", "movie"]
    )
    second = Image(
        caption='Chilling with the crew!',
        img_url='https://thumbs.gfycat.com/IgnorantHarmfulChrysalis-small.gif',
        user_id=2,
        hashtags = ["value", "clean"]
    )
    third = Image(
        img_url='https://c.tenor.com/GAFHkRYtdBsAAAAC/eren-yaeger-eren.gif',
        user_id=3,
        hashtags = ["hot", "titans_suck"]
    )
    fourth = Image(
        caption="Cowboy Bebop is one of the greatest anime ever made, and the music slaps!",
        img_url='http://static1.squarespace.com/static/57825361440243db4a4b7830/57825c4915d5db8fe566cc6f/5fb3f78d4b1d261d27bdd57b/1606672151807/cowboy-bebop-soundtrack-milan-records-vinyl.jpg?format=1500w',
        user_id=2,
        hashtags = ["awesome", "anime", "clean"]
    )
    fifth = Image(
        caption="Shinra is so cool man",
        img_url='https://c.tenor.com/ccWHT-RkK7cAAAAC/fire-force-enen-no-shouboutai.gif',
        user_id=4,
        hashtags = ["awesome", "anime", "clean"]
    )
    sixth = Image(
        caption="My Hero Academia is awesome!",
        img_url='https://media1.giphy.com/media/qzROOBciDBK36/200.gif',
        user_id=1,
        hashtags = ["MHA", "clean"]
    )
    seventh = Image(
        caption="Demon Slayer had some great visuals",
        img_url='https://quotetheanime.com/wp-content/uploads/2021/05/Demon-slayer.jpg',
        user_id=4,
        hashtags = ["demon_slayer", "anime"]
    )

    def getRandomTags():
        tags = []
        for i in range(4):
            tags.append(fake.word())
        return tags

    for image in images:
        db.session.add(Image(img_url=image, user_id=getRandomUser(), hashtags=getRandomTags(), caption=fake.sentences()[0]))

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(sixth)
    db.session.add(seventh)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
