from flask import Blueprint, send_from_directory
from app import app

"""
This code is responsible for serving a react app ("client").
"""

serve = Blueprint('serve', __name__)

@serve.route('/', defaults={'path': ''})
@serve.route('/<path:path>')
def catch_all(path):
    return send_from_directory(app.static_folder, 'index.html')

@serve.errorhandler(404)   
def not_found(e):   
  return send_from_directory(app.static_folder, 'index.html')