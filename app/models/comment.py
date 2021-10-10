from .db import db


class Comment(db.Model):

    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey(
        "images.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="comments")
    image = db.relationship("Image", back_populates="comments")

    # something new

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_id': self.image_id,
            'body': self.body,
            'user': self.user.to_dict()
        }
