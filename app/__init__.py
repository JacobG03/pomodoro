from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
import os


app = Flask(__name__, static_folder=os.path.abspath('./client/build'), static_url_path='')
app.url_map.strict_slashes = False    # fixes unnecessary blueprint view redirection
app.config.from_object(Config)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


from app import JWT, sockets