from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image

class NewImage(FlaskForm):
    title = StringField("Image Title")
    caption = StringField("Caption")
    img_url = StringField("Image URL", [DataRequired()])
    user_id = IntegerField("User Id", [DataRequired()])