from app import db
from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from app.models import Settings
from app.schemas import Settings_Schema


settings = Blueprint('settings', __name__, url_prefix='/api/settings')
settings_Schema = Settings_Schema()


@settings.get('/')
@jwt_required(optional=True)
def get_settings():
  if not current_user:
    return jsonify({
      'settings': {
        'work_time': 1,
        'break_time': 1,
        'lbreak_time': 1,
        'lbreak_interval': 2
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


@settings.post('/')
@jwt_required()
def update_settings():
  # receive data
  data = request.get_json(silent=True)
  # validate data
  errors = settings_Schema.validate(data)
  if errors:
    return jsonify({'errors': errors}), 400

  # update settings
  settings = Settings.query.filter_by(user_id=current_user.id).first()
  settings.work_time = data['work_time']
  settings.break_time = data['break_time']
  settings.longer_break_time = data['longer_break_time']
  settings.longer_break_interval = data['longer_break_interval']

  db.session.add(settings)
  db.session.commit()
  
  return jsonify({
    'message': 'working'
  }), 200