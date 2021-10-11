from flask import Blueprint, jsonify, redirect, request
from sqlalchemy import delete
from sqlalchemy.sql.dml import Delete
from app.forms import deleteImage, editImage
from app.forms.comment_form import DeleteComment, NewComment
from app.forms.like_form import DeleteLike, NewLike
from app.forms.image_form import NewImage
from flask_login import login_required
from app.models import db, Image, Comment, Like
from colors import *

image_routes = Blueprint('images', __name__)

# --------------------------------------------------------
# ---------------------IMAGE ROUTES---------------------
# --------------------------------------------------------


@image_routes.route('/')
def images():
    images = Image.query.all()
    return {"images": [image.to_dict() for image in images]}


@image_routes.route('/<int:id>')
def single_image(id):
    image = Image.query.get(id)
    return {'image': image.to_dict()}


@image_routes.route('/', methods=["POST"])
def add_image():
    form = NewImage()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    # TESTING DATA ->
    # print(CGREEN + "\n REQUEST: \n",request.data,"\n" + CEND)
    # print(CGREEN + "\n DATA: \n", data, "\n" + CEND)
    # print(CGREEN + "\n TITLE: \n",data['title'],"\n\n" + CEND)

    if form.validate_on_submit():
        new_image = Image(
            title=data["title"],
            caption=data["caption"],
            img_url=data["img_url"],
            user_id=data["user_id"]
        )
        db.session.add(new_image)
        db.session.commit()
        return data
    else:
        return "Bad Data"


@image_routes.route('/', methods=["DELETE"])
def delete_image():
    form = deleteImage()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(CGREEN + "\n DATA: \n", data, "\n" + CEND)

    image_to_delete = Image.query.filter(Image.id == data["id"]).first()
    db.session.delete(image_to_delete)
    db.session.commit()

    images = Image.query.all()
    return {"images": [image.to_dict() for image in images]}


@image_routes.route('/', methods=["PUT"])
def edit_image():
    form = editImage()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    # print(CGREEN + "\n DATA: \n", data, "\n" + CEND)

    image = Image.query.filter(Image.id == data["image_id"]).first()

    image.title = data["title"]
    image.caption = data["caption"]

    db.session.commit()

    images = Image.query.all()
    return {"images": [image.to_dict() for image in images]}

# --------------------------------------------------------
# ---------------------COMMENT ROUTES---------------------
# --------------------------------------------------------


@image_routes.route('/comments/', methods=["POST"])
def add_comment():
    form = NewComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    # TESTING DATA ->
    # print(CGREEN + "\n REQUEST: \n",request.data,"\n" + CEND)
    # print(CGREEN + "\n DATA: \n", data, "\n" + CEND)
    # print(CGREEN + "\n TITLE: \n",data['title'],"\n\n" + CEND)

    if form.validate_on_submit():
        new_comment = Comment(
            body=data["body"],
            image_id=data["image_id"],
            user_id=data["user_id"]
        )
        db.session.add(new_comment)
        db.session.commit()
        images = Image.query.all()
        return {"images": [image.to_dict() for image in images]}
    else:
        return "Bad Data"


@image_routes.route('/comments/', methods=["DELETE"])
def delete_comment():
    form = DeleteComment()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CGREEN + "\n DATA: \n", data, "\n" + CEND)

    comment_to_delete = Comment.query.filter(Comment.id == data["id"]).first()
    db.session.delete(comment_to_delete)
    db.session.commit()

    images = Image.query.all()
    return {"images": [image.to_dict() for image in images]}

# --------------------------------------------------------
# ---------------------LIKES ROUTES---------------------
# --------------------------------------------------------

@image_routes.route('/likes/')
def likes():
    likes = Like.query.all()
    return {"likes": [like.to_dict() for like in likes]}

@image_routes.route('/likes/', methods=["POST"])
def add_like():
    form = NewLike()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']

    # TESTING DATA ->
    # print(CGREEN + "\n REQUEST: \n",request.data,"\n" + CEND)
    # print(CGREEN + "\n DATA: \n", data, "\n" + CEND)
    # print(CGREEN + "\n TITLE: \n",data['title'],"\n\n" + CEND)

    if form.validate_on_submit():
        new_like = Like(
            image_id=data["image_id"],
            user_id=data["user_id"]
        )
        db.session.add(new_like)
        db.session.commit()
        likes = Like.query.all()
        return {"likes": [like.to_dict() for like in likes]}
    else:
        return "Bad Data"
