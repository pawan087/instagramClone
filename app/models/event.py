from sqlalchemy.orm import backref
from .db import db


class Event(db.Model):

    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    our_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    other_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(200), nullable=False)
    image_id = db.Column(db.Integer, db.ForeignKey("images.id"), nullable=True)

    # BACKREF WILL "VIRTUALLY CREATE" INCOMING_EVENTS AS A PROPERTY IN THE USER MODEL ->
    our_user = db.relationship("User", backref="incoming_events", foreign_keys=[our_user_id])
    other_user = db.relationship("User", backref="outgoing_events", foreign_keys=[other_user_id])

    def to_dict(self):

        return {
            'id': self.id,
            'our_user_id': self.our_user_id,
            'other_user_id': self.other_user_id,
            'message': self.message,
            'image_id': self.image_id
        }
