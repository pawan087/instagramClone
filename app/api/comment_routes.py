from flask import Blueprint, jsonify, redirect, request
from sqlalchemy import delete
from app.forms import deleteImage, editImage
from app.forms.comment_form import NewComment
from flask_login import login_required
from app.models import db, Comment, User
from colors import *

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def comments():
    comments = Comment.query.all()
    print(CGREEN + f"\n ALLCOMMENTS: {comments}\n" + CEND)
    return {"comments": [comment.to_dict() for comment in comments]}

# @image_routes.route('/', methods=["POST"])
# def add_image():
#     form = NewImage()
#     data = form.data
#     form['csrf_token'].data = request.cookies['csrf_token']

#     # TESTING DATA ->
#     # print(CGREEN + "\n REQUEST: \n",request.data,"\n" + CEND)
#     print(CGREEN + "\n DATA: \n", data,"\n" + CEND)
#     # print(CGREEN + "\n TITLE: \n",data['title'],"\n\n" + CEND)

#     if form.validate_on_submit():
#         new_image = Image(
#             title=data["title"],
#             caption=data["caption"],
#             img_url=data["img_url"],
#             user_id=data["user_id"]
#         )
#         db.session.add(new_image)
#         db.session.commit()
#         return data
#     else:
#         return "Bad Data"

# @image_routes.route('/', methods=["DELETE"])
# def delete_image():
#     form = deleteImage()
#     data = form.data
#     form['csrf_token'].data = request.cookies['csrf_token']

#     print(CGREEN + "\n DATA: \n", data,"\n" + CEND)

#     image_to_delete = Image.query.filter(Image.id == data["id"]).first()
#     db.session.delete(image_to_delete)
#     db.session.commit()

#     images = Image.query.all()
#     return {"images": [image.to_dict() for image in images]}
