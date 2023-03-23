from app import app, db
from app.controllers import appointments
from app.models import Notification, User, Stylist
from app.utils import send_notification
from flask import jsonify, request
from flask_login import login_required, login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from app.forms import LoginForm, RegisterForm

@app.route('/')
def index():
    return jsonify({"message": "Hello, world!"})

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
        new_user = User(email=data['email'], password=hashed_password, first_name=data['first_name'], last_name=data['last_name'])
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
