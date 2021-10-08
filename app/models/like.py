from .db import db

class Like(db.Model):
    
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=False)

    user = db.relationship("User", back_populates="likes")
    image = db.relationship("Image", back_populates="likes")


