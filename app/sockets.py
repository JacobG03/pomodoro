from app import socketio
from flask_socketio import emit


@socketio.on('connect')
def connect():
  print('Client connected')


@socketio.on('disconnect')
def disconnect():
  print('Client disconnected')


@socketio.on('receive session')
def receive_session(data):
  print(data)
  emit('add session', data, broadcast=True)
