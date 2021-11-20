from flask import Blueprint

pomodoros = Blueprint('pomodoros', __name__, url_prefix='/api')

@pomodoros.get('/pomodoros')
def index():
  return {
    'message': 'pomodoros here'
  }