from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_cors import CORS
import secrets

app = Flask(__name__)
app.config.from_object(Config)

app.config['SECRET_KEY'] = secrets.token_hex(16)



# Enable CORS for all routes and allow the specific frontend domain
CORS(app, resources={r"*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Configure Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

from app import views, models

# User loader for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))
