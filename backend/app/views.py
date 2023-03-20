from app import app, db
from app.models import Appointment, Notification, User, Stylist
from app.utils import send_notification
from flask import jsonify, request
import datetime

@app.route('/')
def index():
    return jsonify({"message": "Hello, world!"})

# Add more API endpoints here

# Create a new appointment
@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    appointment = Appointment(
        date=data['date'],
        time=data['time'],
        serviceID=data['serviceID'],
        stylistID=data['stylistID'],
        status='pending'
    )
    db.session.add(appointment)
    db.session.commit()

    # Send notification to the stylist
    send_notification(data['userID'], data['stylistID'], 'New appointment request')

    return jsonify({"message": "Appointment request sent"}), 201

# Stylist approves or rejects appointment
@app.route('/appointments/<int:appointment_id>/status', methods=['PUT'])
def update_appointment_status(appointment_id):
    data = request.get_json()
    appointment = Appointment.query.get(appointment_id)

    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404

    status = data['status']
    if status not in ['approved', 'rejected']:
        return jsonify({"error": "Invalid status"}), 400

    appointment.status = status
    db.session.commit()

    if status == 'approved':
        # Send confirmation notification to the client
        send_notification(appointment.userID, appointment.stylistID, 'Appointment confirmed')

    return jsonify({"message": f"Appointment status updated to {status}"})

