from app import socketio, app, db
from app.models import User, Settings
from app.views.settings import settings
from app.views.auth import auth
from app.views.serve import serve
from app.views.api import api


@app.shell_context_processor
def make_shell_context():
  return {
    'db': db,
    'User': User,
    'Settings': Settings
  }

app.register_blueprint(api)
app.register_blueprint(auth)
app.register_blueprint(settings)
app.register_blueprint(serve)

if __name__ == '__main__':
  socketio.run(app)