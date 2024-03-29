from flask import Blueprint, send_from_directory
import os

"""
This code is responsible for serving a react app ("client").
"""

serve = Blueprint('serve', __name__, static_folder=os.path.abspath('./client/build'), static_url_path='/')


@serve.route('/', defaults={'path': ''})
@serve.route('/<path:path>')
def serve_index_static(path):
  print(path)
  if path != "" and os.path.exists(serve.static_folder + '' + path):
    return send_from_directory(serve.static_folder, path)
  else:
    return send_from_directory(serve.static_folder, 'index.html')
