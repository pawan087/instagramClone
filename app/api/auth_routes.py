from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProfileEditForm
from flask_login import current_user, login_user, logout_user, login_required
from colors import *

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    print(CGREEN + "\n FORM DATA: \n", form.data, "\n" + CEND)

    if form.validate_on_submit():
        print(CGREEN + "\n FORM VALIDATED: \n",
              form.validate_on_submit(), "\n" + CEND)
        if data["avatar"] == '':
            form['avatar'].data = 'https://i.imgur.com/RBkqFEg.jpg'
        print(CGREEN + "\n FORM DATA: \n", form.data, "\n" + CEND)
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            avatar=form.data["avatar"],
            bio=form.data['bio'],
            fname=form.data['fname'],
            lname=form.data['lname'],
        )
        print(CGREEN + "\n USER CREATED: \n", user, "\n" + CEND)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/signup', methods=['PUT'])
def edit_profile():
    """
    Edits existing user
    """
    form = ProfileEditForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print(CGREEN + "\n FORM VALIDATED: \n",
              form.validate_on_submit(), "\n" + CEND)
        if data["avatar"] == '':
            form['avatar'].data = 'https://i.imgur.com/RBkqFEg.jpg'
        user = User.query.filter(User.id == data["id"]).first()

        # Checks to see username changed and then checks to see if it's unique
        if not user.username == data["username"]:
          usernameExists = User.query.filter(User.username == data["username"]).first()
          print(CGREEN + "\n EXISTS: \n", usernameExists, "\n" + CEND)
          if not usernameExists:
            user.username=form.data['username']
          else:
            return "Bad Data"
        # Checks to see email changed and then checks to see if it's unique
        if not user.email == data["email"]:
          userExists = User.query.filter(User.email == data["email"]).first()
          if not userExists:
            user.email=form.data['email']
          else:
            return "Bad Data"
        # Checks to see if password changed versus the validated "oldpassword"
        if not data["oldPassword"] == data["password"] and not data["password"] == "":
          user.password=form.data['password']
        user.avatar=form.data["avatar"]
        user.bio=form.data['bio']
        user.pronouns=form.data['pronouns']
        user.fname=form.data['fname']
        user.lname=form.data['lname']

        print(CGREEN + "\n USER UPDATED: \n", user, "\n" + CEND)
        db.session.commit()
        # login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
