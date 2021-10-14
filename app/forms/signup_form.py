from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.core import IntegerField, SelectField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from colors import *

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def username_exists_edit(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_matches(form, field):
    # Checking if password matches
    old_password = field.data
    id = form.data['id']
    user = User.query.filter(User.id == id).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(old_password):
        raise ValidationError('Password was incorrect.')

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    fname = StringField('First Name', validators=[DataRequired()])
    lname = StringField('Last Name', validators=[DataRequired()])
    bio = TextAreaField('Last Name')
    pronouns = SelectField("Pronouns", choices=['He/Him', 'She/Her', 'They/Them', 'Other'])
    password = StringField('password', validators=[DataRequired()])
    avatar = StringField('avatar')


class ProfileEditForm(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    username = StringField('username')
    email = StringField('email')
    fname = StringField('First Name', validators=[DataRequired()])
    lname = StringField('Last Name', validators=[DataRequired()])
    bio = TextAreaField('Last Name')
    pronouns = SelectField("Pronouns", choices=['He/Him', 'She/Her', 'They/Them', 'Other'])
    oldPassword = StringField('old_password', validators=[DataRequired(), password_matches])
    password = StringField('password')
    avatar = StringField('avatar')
