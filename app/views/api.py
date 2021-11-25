from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api')


@api.get('/')
def index():
  return {
    'message': 'API seems to be working.'
  }, 200
  