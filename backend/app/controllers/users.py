from app import db
from app.models import User

def create_user(data):
    #Checks if user already exists
    # if user_exist(data['email']):
    #     return None
    
    user = User(
        email = data['email'],
        password = data['password'],
        phone = data['phone'],
        first_name = data['first_name'],
        last_name = data['last_name'],
        roles = data['roles'],
        is_superuser = data['is_superuser']
    )
    
    db.session.add(user)
    db.session.commit()
    return user
    
def get_user(user_id):
    return User.query.get(user_id)

def get_all_user():
    return User.query.all()

def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None

    for key, value in data.items():
        if hasattr(user, key):
            setattr(user, key, value)

    db.session.commit()
    return user

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return True
    return False

def user_exist(user_id, email):
    users = get_all_user()
    for user in users:
        if user.userID == user_id or user.email == email:
            return True
    return False