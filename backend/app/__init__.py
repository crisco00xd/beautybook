from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_login import LoginManager
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config.from_object(Config)

app.config['SECRET_KEY'] = "b535e899f17361e9264aa4413d6cb704"
app.config['JWT_SECRET_KEY'] = 'b535e899f17361e9264aa4413d6cb704'  # Replace with a strong secret key
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400  # Token expires after 1 day (in seconds)

CORS(app, resources={r"*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'sign_in'

jwt = JWTManager(app)

from app import views, models

@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))
