from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    first = Comment(
        body='It\'s definitely in my top 5.',
        image_id=5,
        user_id=1
    )
    second = Comment(
        body='I haven\'t watched it either but I\'ve heard good things about it.',
        image_id=1,
        user_id=4
    )
    third = Comment(
        body='Oh wow 😳',
        image_id=3,
        user_id=5
    )
    fourth = Comment(
        body='Season 5 is awesome!',
        image_id=6,
        user_id=4
    )
    fifth = Comment(
        body='Lets watch it together!',
        image_id=1,
        user_id=1
    )
    sixth = Comment(
        body='Best anime opening ever!',
        image_id=4,
        user_id=1
    )
    seventh = Comment(
        body='No way, One Piece has the best anime openings, and the most!',
        image_id=4,
        user_id=3
    )
    eighth = Comment(
        body='I can\'t wait for season 2! It was just confirmed!',
        image_id=7,
        user_id=1
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.add(fourth)
    db.session.add(fifth)
    db.session.add(sixth)
    db.session.add(seventh)
    db.session.add(eighth)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
