import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    DEBUG = os.environ.get('DEBUG') or False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'mysql+mysqlconnector://root:mysql@localhost:3306/beautybook' #CHANGE THIS
    SQLALCHEMY_TRACK_MODIFICATIONS = False
