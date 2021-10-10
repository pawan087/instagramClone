from sqlalchemy.orm import backref
from .db import db
from colors import *


class Image(db.Model):

    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    caption = db.Column(db.String(2000), nullable=True)
    img_url = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    hashtags = db.Column(db.ARRAY(db.String(50)), nullable=True)

    user = db.relationship("User", back_populates="images")
    likes = db.relationship("Like", back_populates="image",
                            cascade="all, delete-orphan")
    comments = db.relationship(
        "Comment", back_populates="image", cascade="all, delete-orphan")

    def to_dict(self):

        return {
            'id': self.id,
            'title': self.title,
            'caption': self.caption,
            'img_url': self.img_url,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'comments': {"comments": [comment.to_dict() for comment in self.comments]},
            'hashtags': self.hashtags
        }

    def __repr__(self, type="something"):

        if(type == "full"):
            return f"""
            id: {self.id}, 
            title: {self.title}, 
            caption: {self.caption}, 
            img_url: {self.img_url}, 
            user_id: {self.user_id}"""
        else:
            return f"<Image {self.id}, title: {self.title}>"
