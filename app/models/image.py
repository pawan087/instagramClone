from .db import db


class Image(db.Model):

    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=True)
    caption = db.Column(db.String(2000), nullable=True)
    img_url = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="images")
    likes = db.relationship("Like", back_populates="image")
    comments = db.relationship("Comment", back_populates="image")


    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'caption': self.caption,
            'img_url': self.img_url,
            'user_id': self.user_id,            
        }
