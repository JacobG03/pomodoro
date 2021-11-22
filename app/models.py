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







# Concepts
# # The moment user clicks start on work, break etc. create this pomodoro
# # depending on given type of pomodoro create work or break etc.
# # make sure break and time dont exist at the same time

# # first create type of pomodoro and after that 'Pomodoro' it self

# class Pomodoro(db.Model):
#   """
#   Pomodoro(author_id)
#   """
#   id = db.Column(db.Integer, primary_key=True)
#   author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#   work_id = db.Column(db.Integer, db.ForeignKey('work.id'), nullable=True)
#   break_id = db.Column(db.Integer, db.ForeignKey('break.id'), nullable=True)
#   long_break_id = db.Column(db.Integer, db.ForeignKey('long_break.id'), nullable=True)
#   users = db.relationship('User', backref='pomodoro', lazy=True)


# # Gets created the moment the user clicks 'start'
# # 'resetting' the timer will basically delete this and create a new object again on 'start'
# class Work(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   time = db.Column(db.Integer, default=25, nullable=False)
#   start = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
#   stop = db.Column(db.DateTime, nullable=True)


# class Break(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   time = db.Column(db.Integer, default=5, nullable=False)
#   start = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
#   stop = db.Column(db.DateTime, nullable=True)


# class LongBreak(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   time = db.Column(db.Integer, default=10, nullable=False)
#   start = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
#   stop = db.Column(db.DateTime, nullable=True)
#   interval = db.Column(db.Integer, default=4, nullable=False)


# class Session(db.Model):
#   """
#   Session(pomodoro_id)
#   """
#   id = db.Column(db.Integer, primary_key=True)
#   pomodoro_id = db.Column(db.Integer, db.ForeignKey('pomodoro.id'), nullable=False)
#   active = db.Column(db.String(64), nullable=True)  # ['work', 'break', 'long_break']
#   users = db.relationship('User', backref='session', lazy=True)


# 'Settings' class will be usefull (keep track of work time, break time etc )