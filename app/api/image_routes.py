from flask import Blueprint, jsonify, redirect, request
from sqlalchemy.orm import joinedload, sessionmaker
from app.forms.image_form import NewImage
from flask_login import login_required
from app.models import db, Image, User
from colors import *

image_routes = Blueprint('images', __name__)


@image_routes.route('/')
def images():
    images = Image.query.all()
    print(CGREEN + f"\n ALLIMAGES: {images}\n" + CEND)
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
    print(CGREEN + "\n DATA: \n", data,"\n" + CEND)
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

# @image_routes.route('/', methods=["PATCH"])
# def edit_image():
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