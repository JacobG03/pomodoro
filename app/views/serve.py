from flask import Blueprint, send_from_directory
import os

"""
This code is responsible for serving a react app ("client").
"""

serve = Blueprint('serve', __name__, static_folder=os.path.abspath('../../client/build'), static_url_path='')

@serve.route('/', defaults={'path': ''})
@serve.route('/<path:path>')
def catch_all(path):
    return send_from_directory(serve.static_folder, 'index.html')

@serve.errorhandler(404)   
def not_found(e):   
  return send_from_directory(serve.static_folder, 'index.html')