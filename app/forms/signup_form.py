from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def password_length(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password is too short.')


def valid_email(form, field):
    email = field.data
    if "@" not in email or "." not in email:
        raise ValidationError("Email is not valid.")


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), valid_email, user_exists])
    password = StringField('password', validators=[DataRequired(), password_length, EqualTo('confirm_password', message='Passwords do not match.')])
    confirm_password = StringField('confirm_password', validators=[DataRequired()])
