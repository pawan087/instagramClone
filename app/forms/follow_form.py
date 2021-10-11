from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewFollow(FlaskForm):
    current_user_id = IntegerField("Current User Id", [DataRequired()])
    user_to_follow_id = IntegerField("User to Follow Id", [DataRequired()])


class DeleteFollow(FlaskForm):
    pass
