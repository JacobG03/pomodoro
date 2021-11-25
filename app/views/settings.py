from app import db
from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from app.models import Settings
from app.schemas import Settings_Schema, UsernameSchema, AvatarSchema


settings = Blueprint('settings', __name__, url_prefix='/api/settings')
settings_Schema = Settings_Schema()
usernameSchema = UsernameSchema()
avatarSchema = AvatarSchema()


@settings.get('/delete')
@jwt_required()
def delete_account():
  settings = Settings.query.get(user_id=current_user.id).first()
  db.session.delete(settings)
  db.session.commit()
  
  db.session.delete(current_user)
  db.session.commit()
  
  return jsonify({
    'message': 'Account deleted successfully'
  }), 200
  


@settings.post('/avatar')
@jwt_required()
def set_avatar():
  data = request.get_json(force=True, silent=True)
  errors = avatarSchema.validate(data)
  if errors:
    return jsonify({'errors': errors}), 400
  
  current_user.avatar = data['avatar']
  db.session.add(current_user)
  db.session.commit()
  
  return jsonify({
    'message': 'Avatar changed succesfully.'
  }), 200
  
  
@settings.post('/username')
@jwt_required()
def set_username():
  data = request.get_json(force=True, silent=True)
  print(data)
  errors = usernameSchema.validate(data)
  if errors:
    return jsonify({'errors': errors}), 400
  
  current_user.username = data['username']
  db.session.add(current_user)
  db.session.commit()
  
  return jsonify({
    'message': 'Username changed succesfully.'
  }), 200


@settings.get('/pomodoros')
@jwt_required(optional=True)
def get_pomodoros():
  if not current_user:
    return jsonify({
      'settings': {
        'work_time': 25,
        'break_time': 5,
        'lbreak_time': 10,
        'lbreak_interval': 4
      }
    }), 200
  
  settings = Settings.query.filter_by(user_id=current_user.id).first()
  return jsonify({
    'settings': {
      'work_time': settings.work_time,
      'break_time': settings.break_time,
      'lbreak_time': settings.longer_break_time,
      'lbreak_interval': settings.longer_break_interval
    }
  }), 200


@settings.post('/pomodoros')
@jwt_required()
def update_pomodoros():
  # receive data
  data = request.get_json(silent=True, force=True)
  # validate data
  errors = settings_Schema.validate(data)
  if errors:
    return jsonify({'errors': errors}), 400

  # update settings
  settings = Settings.query.filter_by(user_id=current_user.id).first()
  settings.work_time = data['work_time']
  settings.break_time = data['break_time']
  settings.longer_break_time = data['lbreak_time']
  settings.longer_break_interval = data['lbreak_interval']

  db.session.add(settings)
  db.session.commit()
  
  return jsonify({
    'message': 'Pomodoros updated succesfully'
  }), 200