from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewLike(FlaskForm):
    liking_user_id = IntegerField("Liking User Id", [DataRequired()])
    liked_user_id = IntegerField("Liked User Id", [DataRequired()])
    image_id = IntegerField("Image Id", [DataRequired()])


class DeleteLike(FlaskForm):
    like_id = IntegerField("Id")
    event_id = IntegerField("event id")

