from app.models import db, User
from .names import names
import random

def getRandomNumber():
    return random.randint(1, 15)


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io', 
        password='password', 
        followers=[2, 4], 
        following=[2,3,4], 
        fname="Demo", lname="User", 
        bio="A clean person doing clean things.", 
        pronouns="They/Them",
        saved_images=[2,3]    
)
    franky = User(
        avatar="https://i.imgur.com/xScWp5V.gif", 
        username='super_franky',
        email='franky@aa.io', 
        password='password', 
        followers=[1,4], 
        following=[1,3,4], 
        fname="Cutty", 
        lname="Flam", 
        bio="The shipwright of the Straw Hat Pirates... SUPER!",
        pronouns="He/Him",
        saved_images=[1,4]    
)
    eren = User(
        avatar="https://i.imgur.com/HGmjwwZ.gif", 
        username='titan_slayer', 
        email='eren@aa.io', 
        password='password', 
        followers=[1,2,3,4,5], 
        following=[3], 
        fname="Eren", 
        lname="Jaeger", 
        bio="All the anime girls simp for me after season 4 son.", 
        pronouns="He/Him",
        saved_images=[]

)
    picasso = User(
        avatar="https://i.imgur.com/Y8FaFvQ.jpg", 
        username='picasso', 
        email='picasso@aa.io', 
        password='password', 
        followers=[1,2], 
        following=[1,2,3], 
        fname="Pablo", 
        lname="Picasso", 
        bio="5'6\" Giant", 
        pronouns="He/Him",
        saved_images=[1,2,3,4]    
)
    mikasa = User(
        avatar="https://i.pinimg.com/originals/9f/87/7c/9f877c2062221ea223eb7c69d7d1bda5.jpg", 
        username='not_mikasa', 
        email='mikasa@aa.io', 
        password='password', 
        followers=[3], 
        following=[3], 
        fname="Mikasa", 
        lname="Ackerman", 
        bio="Not Mikasa Ackerman", 
        pronouns="She/Her",
        saved_images=[3]    
)

    def getRandomFollowers():
        randomFollowers = []
        for i in range(getRandomNumber()):
            randomFollowers.append(i)
        return randomFollowers

    def getRandomImages():
        randomImages = []
        for i in range(1, 40):
            randomImages.append(i)
        return randomImages

    for name in names:
        db.session.add(User(username=name, fname=name, lname=name, bio=f"Hey! It's {name}", email=f"{name}@aa.io", password="password", followers=getRandomFollowers(), following=getRandomFollowers(), saved_images=getRandomImages()))

    db.session.add(demo)
    db.session.add(franky)
    db.session.add(eren)
    db.session.add(picasso)
    db.session.add(mikasa)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
