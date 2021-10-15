from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired


class NewImage(FlaskForm):
    caption = StringField("Caption")
    img_url = FileField(validators=[FileRequired()])
    user_id = IntegerField("User Id", [DataRequired()])
    hashtags = StringField("Hashtag")


class deleteImage(FlaskForm):
    id = IntegerField("Id")


class editImage(FlaskForm):
    image_id = IntegerField("Image Id", [DataRequired()])
    caption = StringField("Caption")
    user_id = IntegerField("User Id", [DataRequired()])
    hashtags = StringField("Hashtag")
