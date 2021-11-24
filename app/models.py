from app import db
from datetime import datetime


class User(db.Model):
  """
  User(username, email, password)
  """
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), unique=True, nullable=False)
  email = db.Column(db.String(128), unique=True, nullable=False)
  password = db.Column(db.String(256), nullable=False)
  avatar = db.Column(db.String(512), nullable=True)

  def set_avatar(self):
    self.avatar = f'https://avatarfiles.alphacoders.com/199/199027.jpg'


class Settings(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
  work_time = db.Column(db.Integer, default=25, nullable=False)
  break_time = db.Column(db.Integer, default=5, nullable=False)
  longer_break_time = db.Column(db.Integer, default=10, nullable=False)
  longer_break_interval = db.Column(db.Integer, default=4, nullable=False)


