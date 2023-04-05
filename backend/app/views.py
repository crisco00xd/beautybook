from app import app, db
from app.controllers import appointments, users, notifications, salons, services, stylists
from app.models import Notification, User, Stylist
from app.utils import send_notification
from flask import jsonify, request
from flask_login import login_required, login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from app.forms import LoginForm, RegisterForm
from app.decorators import is_superuser

@app.route('/')
def index():
    return jsonify({"message": "Hello, world!"})

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = users.create_user(data)
    
    if not user:
        return jsonify({"error": "User already exist"}), 400
    
    return jsonify({"message": "User created"}), 201

# Get an user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = users.get_user(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize())

# Get all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users_list = users.get_all_user()
    return jsonify([user.serialize() for user in users_list])

# Update user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = users.update_user(user_id, data)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "User updated"})

# Delete user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    deleted = users.delete_user(user_id)
    if not deleted:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"message": "User deleted"})

# Create a new appointment
@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    appointment = appointments.create_appointment(data)

    if not appointment:
        return jsonify({"error": "The stylist is not available at the requested time"}), 400

    # Send notification to the stylist
    send_notification(data['userID'], data['stylistID'], 'New appointment request')

    return jsonify({"message": "Appointment request sent"}), 201

# Get an appointment by ID
@app.route('/appointments/<int:appointment_id>', methods=['GET'])
def get_appointment(appointment_id):
    appointment = appointments.get_appointment(appointment_id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    return jsonify(appointment.serialize())

# Get all appointments
@app.route('/appointments', methods=['GET'])
def get_all_appointments():
    appointments_list = appointments.get_all_appointments()
    return jsonify([appointment.serialize() for appointment in appointments_list])

# Update appointment
@app.route('/appointments/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    data = request.get_json()
    appointment = appointments.update_appointment(appointment_id, data)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    return jsonify({"message": "Appointment updated"})

# Delete appointment
@app.route('/appointments/<int:appointment_id>', methods=['DELETE'])
def delete_appointment(appointment_id):
    deleted = appointments.delete_appointment(appointment_id)
    if not deleted:
        return jsonify({"error": "Appointment not found"}), 404

    return jsonify({"message": "Appointment deleted"})

# Stylist approves or rejects appointment
@app.route('/appointments/<int:appointment_id>/status', methods=['PUT'])
def update_appointment_status(appointment_id):
    data = request.get_json()
    appointment = appointments.update_appointment(appointment_id, {'status': data['status']})

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    if data['status'] == 'approved':
        # Send confirmation notification to the client
        send_notification(appointment.userID, appointment.stylistID, 'Appointment confirmed')

    return jsonify({"message": f"Appointment status updated to {data['status']}"})

# Get all busy times
@app.route('/appointments/busy-times', methods=['GET'])
def get_busy_times():
    busy_times = appointments.get_busy_times()
    return jsonify(busy_times)

# Create a new service
@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    service = services.create_user(data)
    
    if not service:
        return jsonify({"error": "Service already exist"}), 400
    
    return jsonify({"message": "Service created"}), 201

# Get an service by ID
@app.route('/services/<int:service_id>', methods=['GET'])
def get_service(service_id):
    service = services.get_user(service_id)
    if not service:
        return jsonify({"error": "User not found"}), 404

    return jsonify(service.serialize())

# Get all services
@app.route('/services', methods=['GET'])
def get_all_services():
    services_list = services.get_all_service()
    return jsonify([service.serialize() for service in services_list])

# Update service
@app.route('/services/<int:service_id>', methods=['PUT'])
def update_service(service_id):
    data = request.get_json()
    service = services.update_service(service_id, data)
    if not service:
        return jsonify({"error": "Service not found"}), 404

    return jsonify({"message": "Service updated"})

# Delete service
@app.route('/services/<int:service_id>', methods=['DELETE'])
def delete_service(service_id):
    deleted = services.delete_service(service_id)
    if not deleted:
        return jsonify({"error": "Service not found"}), 404

    return jsonify({"message": "Service deleted"})

# Create a new stylist
@app.route('/stylists', methods=['POST'])
def create_stylist():
    data = request.get_json()
    stylist = stylists.create_stylist(data)
    
    if not stylist:
        return jsonify({"error": "Stylist already exist"}), 400
    
    return jsonify({"message": "Stylist created"}), 201

# Get an stylist by ID
@app.route('/stylists/<int:stylist_id>', methods=['GET'])
def get_stylist(stylist_id):
    stylist = stylists.get_stylist(stylist_id)
    if not stylist:
        return jsonify({"error": "Stylist not found"}), 404

    return jsonify(stylist.serialize())

# Get all stylists
@app.route('/stylists', methods=['GET'])
def get_all_stylists():
    stylists_list = stylists.get_all_stylist()
    return jsonify([stylist.serialize() for stylist in stylists_list])

# Update stylist
@app.route('/stylists/<int:stylist_id>', methods=['PUT'])
def update_stylist(stylist_id):
    data = request.get_json()
    stylist = stylists.update_stylist(stylist_id, data)
    if not stylist:
        return jsonify({"error": "Stylist not found"}), 404

    return jsonify({"message": "Stylist updated"})

# Delete stylist
@app.route('/stylists/<int:stylist_id>', methods=['DELETE'])
def delete_stylist(stylist_id):
    deleted = stylists.delete_stylist(stylist_id)
    if not deleted:
        return jsonify({"error": "Stylist not found"}), 404

    return jsonify({"message": "Stylist deleted"})

# Create a new notification
@app.route('/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    notification = notifications.create_notification(data)
    
    if not notification:
        return jsonify({"error": "Notification already exist"}), 400
    
    return jsonify({"message": "Notification created"}), 201

# Get an notification by ID
@app.route('/notifications/<int:notification_id>', methods=['GET'])
def get_notification(notification_id):
    notification = notifications.get_notification(notification_id)
    if not notification:
        return jsonify({"error": "Notification not found"}), 404

    return jsonify(notification.serialize())

# Get all notifications
@app.route('/notifications', methods=['GET'])
def get_all_notifications():
    notifications_list = notifications.get_all_notification()
    return jsonify([notification.serialize() for notification in notifications_list])

# Update notification
@app.route('/notifications/<int:notification_id>', methods=['PUT'])
def update_notification(notification_id):
    data = request.get_json()
    notification = notifications.update_notification(notification_id, data)
    if not notification:
        return jsonify({"error": "Notification not found"}), 404

    return jsonify({"message": "Notification updated"})

# Delete notification
@app.route('/notifications/<int:notification_id>', methods=['DELETE'])
def delete_notification(notification_id):
    deleted = notifications.delete_notification(notification_id)
    if not deleted:
        return jsonify({"error": "Notification not found"}), 404

    return jsonify({"message": "Notification deleted"})

# Login route
@app.route('/user/sign-in', methods=['POST'])
def sign_in():
    if current_user.is_authenticated:
        return jsonify({"message": "Already logged in"})

    data = request.get_json()
    form = LoginForm.from_json(data)
    if form.validate():
        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            login_user(user)
            return jsonify({"message": "Logged in successfully"})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    return jsonify({"error": form.errors}), 400

# Registration route
@app.route('/user/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return jsonify({"message": "Already logged in"})

    data = request.get_json()
    form = RegisterForm.from_json(data)
    if form.validate():
        hashed_password = generate_password_hash(data['password'])
        new_user = User(email=data['email'], password=hashed_password, first_name=data['first_name'], last_name=data['last_name'], is_superuser=data.get('is_superuser', False))
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"})
    return jsonify({"error": form.errors}), 400

# Logout route
@app.route('/user/sign-out')
@login_required
def sign_out():
    logout_user()
    return jsonify({"message": "Logged out successfully"})

# Example protected route with role-based access
@app.route('/admin/dashboard')
@login_required
def admin_dashboard():
    if 'admin' not in current_user.roles:
        return jsonify({"error": "Unauthorized access"}), 403

    # Your admin dashboard implementation here
    return jsonify({"message": "Welcome to the admin dashboard"})



# This is Super User Only Access Routes
# ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
@app.route('/restricted', methods=['GET'])
@is_superuser
def restricted_route():
    #CHANGE THIS
    pass