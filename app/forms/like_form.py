from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewLike(FlaskForm):
    user_id = IntegerField("Liking User Id", [DataRequired()])
    image_id = IntegerField("Image Id", [DataRequired()])


class DeleteLike(FlaskForm):
    like_id = IntegerField("Id")

