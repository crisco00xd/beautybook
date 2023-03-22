from app import app, db
from app.controllers import appointments
from app.models import Notification, User, Stylist
from app.utils import send_notification
from flask import jsonify, request

@app.route('/')
def index():
    return jsonify({"message": "Hello, world!"})

# Create a new appointment
@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    appointment = appointments.create_appointment(data)

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
