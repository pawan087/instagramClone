from flask_wtf import FlaskForm
from wtforms.fields.core import IntegerField

from .login_form import LoginForm
from .signup_form import SignUpForm, ProfileEditForm
from .image_form import NewImage, editImage, deleteImage
from .comment_form import NewComment, DeleteComment
from .like_form import NewLike, DeleteLike
from .follow_form import NewFollow, DeleteFollow
