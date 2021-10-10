from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewComment(FlaskForm):
    user_id = IntegerField("User Id", [DataRequired()])
    image_id = IntegerField("Image Id", [DataRequired()])
    body = StringField("Caption", [DataRequired()])


class DeleteComment(FlaskForm):
    id = IntegerField("Id")
