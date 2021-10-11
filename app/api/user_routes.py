from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms.follow_form import DeleteFollow, NewFollow

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/following/', methods=["POST"])
def add_follow():
    form = NewFollow()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_to_follow = User.query.get(data['user_to_follow_id'])
        current_user = User.query.get(data['current_user_id'])

        db.session.commit()
        # users = User.query.all()
        # return {'users': [user.to_dict() for user in users]}
    else:
        return "Bad Data"
