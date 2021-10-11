from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class NewImage(FlaskForm):
    title = StringField("Image Title")
    caption = StringField("Caption")
    img_url = StringField("Image URL", [DataRequired()])
    user_id = IntegerField("User Id", [DataRequired()])
    hashtags = StringField("Hashtag")


class deleteImage(FlaskForm):
    id = IntegerField("Id")


class editImage(FlaskForm):
    image_id = IntegerField("Image Id", [DataRequired()])
    title = StringField("Image Title")
    caption = StringField("Caption")
    user_id = IntegerField("User Id", [DataRequired()])
    hashtags = StringField("Hashtag")
