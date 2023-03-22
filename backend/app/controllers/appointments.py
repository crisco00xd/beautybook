from app import db
from app.models import Appointment
from datetime import datetime

def create_appointment(data):
    appointment = Appointment(
        date=data['date'],
        time=data['time'],
        serviceID=data['serviceID'],
        stylistID=data['stylistID'],
        status='pending'
    )
    db.session.add(appointment)
    db.session.commit()
    return appointment

def get_appointment(appointment_id):
    return Appointment.query.get(appointment_id)

def get_all_appointments():
    return Appointment.query.all()

def update_appointment(appointment_id, data):
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return None

    for key, value in data.items():
        if hasattr(appointment, key):
            setattr(appointment, key, value)

    db.session.commit()
    return appointment

def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)
    if appointment:
        db.session.delete(appointment)
        db.session.commit()
        return True
    return False

def get_busy_times():
    appointments = get_all_appointments()
    busy_times = []
    for appointment in appointments:
        utc_start_time = appointment.time
        duration = appointment.service.duration
        utc_end_time = (datetime.combine(appointment.date, appointment.time) + duration).time()
        busy_times.append({
            'date': appointment.date,
            'start_time': utc_start_time,
            'end_time': utc_end_time
        })
    return busy_times
