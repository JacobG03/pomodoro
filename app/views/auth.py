from app import db
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, current_user, jwt_required
from app.models import User
from app.schemas import CreateRegisterSchema, CreateLoginSchema


auth = Blueprint('auth', __name__, url_prefix='/api/auth')

registerSchema = CreateRegisterSchema()
loginSchema = CreateLoginSchema()


# User details
@auth.get('/')
@jwt_required(optional=True)
def index():
  if not current_user:
    return jsonify({'user': None}), 200

  return jsonify({
    'user': {
      'is_auth': True,
      'username': current_user.username,
      'avatar': current_user.avatar
    }
  }), 200


# Todo delete account - auth.delete('/')


@auth.post('/register')
def register():
  # receive data
  data = request.get_json(silent=True)
  # validate data
  errors = registerSchema.validate(data)
  if errors:
    return jsonify({'errors': errors}), 400

  # check whether passwords are identical
  elif data['password'] != data['password2']:
    errors = {
        'password': ['Passwords must match'],
        'password2': ['Passwords must match']
      }
    return jsonify({'errors': errors}), 400

  # hash password
  hashed_password = generate_password_hash(data['password'], method='sha256')

  # create user
  user = User(
    username=data['username'],
    email=data['email'],
    password=hashed_password
  )
  user.set_avatar()
  db.session.add(user)
  db.session.commit()

  return jsonify({
    'message': 'User registered successfully.'
  }), 200


@auth.post('/login')
def login():
  response = jsonify({
    'message': 'Logged in successfully.'
  })
  # receive data
  data = request.get_json(silent=True)
  # validate data
  errors = loginSchema.validate(data)
  if errors:
    return jsonify({
      'errors': errors
    }), 400

  # check if user exists
  user = User.query.filter_by(email=data['email']).first()
  if user and check_password_hash(user.password, data['password']):
    # crate token
    access_token = create_access_token(identity=user)
    # set token cookie in browser
    set_access_cookies(response, access_token)

    return response

  return jsonify({
      'errors': {
        'email': ['Invalid credentials'],
        'password': ['Invalid credentials']
      }
    }), 400


@auth.get('/logout')
def logout():
  response = jsonify({
    'message': 'Logged out successfully.'
  })
  unset_jwt_cookies(response)
  return response, 200


@auth.get('/refresh')
@jwt_required()
def refresh_token():
  response = jsonify()
  access_token = create_access_token(identity=current_user)
  set_access_cookies(response, access_token)
  return response, 200