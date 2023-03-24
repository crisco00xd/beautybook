from functools import wraps
from flask import request, jsonify
from app.models import User

def is_superuser(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.user.is_superuser:
            return jsonify({"error": "Unauthorized access"}), 403
        return f(*args, **kwargs)
    return decorated_function
