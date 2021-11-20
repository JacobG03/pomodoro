from app import socketio
from flask_socketio import emit


@socketio.on('connect')
def connect():
  print('Client connected')


@socketio.on('disconnect')
def disconnect():
  print('Client disconnected')


@socketio.on('add session')
def receive_session(data):
  emit('add session', data, broadcast=True)


@socketio.on('delete session')
def delete_session(data):
  emit('delete session', data, broadcast=True)