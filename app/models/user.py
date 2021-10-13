from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# follow_user = db.Table(
#     'follow_user',
#     db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("followee_id", db.Integer, db.ForeignKey("users.id"))
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(2000), nullable=True, default='https://i.imgur.com/RBkqFEg.jpg')
    fname = db.Column(db.String(100), nullable=False)
    lname = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.String(500), nullable=True)
    pronouns = db.Column(db.String(100), nullable=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    followers = db.Column(db.ARRAY(db.Integer), default=[])
    following = db.Column(db.ARRAY(db.Integer), default=[])

    images = db.relationship("Image", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    # followers = db.relationship(
    #     'User', # referring to the model / class
    #     secondary=follow_user, # Join table name
    #     primaryjoin=(follow_user.c.follower_id == id), # ?
    #     secondaryjoin=(follow_user.c.followee_id == id), # ?
    #     backref=db.backref('follow_user', lazy='dynamic'), # ?
    #     lazy='dynamic' # ?
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fname': self.fname,
            'lname': self.lname,
            'bio': self.bio,
            'pronouns': self.pronouns,
            'email': self.email,
            'followers': self.followers,
            'following': self.following,
            'avatar': self.avatar,
            'incoming_events': {"incoming": [event.to_dict() for event in self.incoming_events]},
        }

    # def __repr__(self):
    #     return f"""
    #     User:
    #         id: {self.id},
    #         username: {self.username},
    #         email: {self.email}
    #     """
