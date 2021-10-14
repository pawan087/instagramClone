from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewEvent(FlaskForm):
    other_user_id = IntegerField("event creator user Id", [DataRequired()])
    our_user_id = IntegerField("event receiver user Id", [DataRequired()])
    message = StringField("message", [DataRequired()])
    image_id = IntegerField("Image Id")


class DeleteEvent(FlaskForm):
    event_id = IntegerField("Event Id")

