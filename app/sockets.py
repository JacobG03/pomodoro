from app import socketio
from flask_socketio import emit

# let add = true
# for (let i = 0; i < this.state.sessions.length; i++) {
#   if (this.state.sessions[i].user.username === data.user.username) {
#     let new_sessions = this.state.sessions
#     new_sessions[i] = data
#     add = false
#     this.setState({sessions: new_sessions}) 
#   } 
# }
# if (add) {
#   let new_sessions = this.state.sessions
#   new_sessions.push(data)
#   this.setState({sessions: new_sessions})
# }

sessions = []


@socketio.on('connect')
def connect():
  print('Client connected')


@socketio.on('disconnect')
def disconnect():
  print('Client disconnected')


@socketio.on('receive session')
def receive_session(data):
  sessions = validateSessions(data)
  emit('add sessions', sessions, broadcast=True)
  emit('update active', {'amount': len(sessions)}, broadcast=True)
  return


@socketio.on('delete session')
def delete_session(data):
  id = data['id']
  for index, session in enumerate(sessions):
    if session['user']['id'] == id:
      del sessions[index]
      emit('sync sessions', sessions, broadcast=True)
      break
      
  emit('update active', {'amount': len(sessions)}, broadcast=True)
  return True


@socketio.on('req all sessions')
def req_all_sessions():
  emit('sync sessions', sessions)


@socketio.on('get active')
def get_active():
  emit('update active', {'amount': len(sessions)}, broadcast=True)


def validateSessions(data):
  # update existing user session
  for index, session in enumerate(sessions):
    if session['user']['id'] == data['user']['id']:
      sessions[index] = data
      return sessions
  # add new user session
  sessions.append(data)
  return sessions