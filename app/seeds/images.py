from app.models import db, Image


# Adds a demo user, you can add other users here if you want
def seed_images():
    first = Image(
        title='Clean Title',
        caption='Wow, a clean image',
        img_url='https://otakukart.com/wp-content/uploads/2021/03/Spring-Anime-2021-Featured.jpg',
        user_id=1,
        hashtags = ["online", "clean"]
    )
    second = Image(
        title='Online Title',
        caption='Wow, this image is so online!',
        img_url='https://cdn.mos.cms.futurecdn.net/qXsVayNBGNZejBMQeYNiHa-1200-80.jpg',
        user_id=2,
        hashtags = ["value", "clean"]
    )
    third = Image(
        title='Free Title',
        caption='Wow, this image is so free!',
        img_url='https://media.gq-magazine.co.uk/photos/5ffdc57f9cafd9b0acd1b649/master/w_1920,h_1280,c_limit/120121_Anime_03.jpg',
        user_id=3,
        hashtags = ["free", "clean"]
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
