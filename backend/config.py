import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = os.environ.get('DEBUG') or False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+mysqlconnector://username:password@your-db-host:3306/your-db-name'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
