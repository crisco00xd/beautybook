from app import db
from app.models import Appointment
from datetime import datetime
from datetime import timedelta
from app.models import Service

def create_appointment(data):
    # Check if the proposed time conflicts with existing appointments
    service = Service.query.get(data['serviceID'])
    if is_stylist_busy(data['stylistID'], data['date'], data['time'], service.duration):
        return None

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

def is_stylist_busy(stylist_id, proposed_date, proposed_time, service_duration):
    busy_times = get_busy_times()
    proposed_start = datetime.combine(proposed_date, proposed_time)
    proposed_end = proposed_start + service_duration

    for busy_time in busy_times:
        busy_date = busy_time['date']
        busy_start = datetime.combine(busy_date, busy_time['start_time'])
        busy_end = datetime.combine(busy_date, busy_time['end_time'])

        if stylist_id == busy_time['stylistID'] and proposed_date == busy_date:
            if (proposed_start >= busy_start and proposed_start < busy_end) or \
               (proposed_end > busy_start and proposed_end <= busy_end) or \
               (proposed_start <= busy_start and proposed_end >= busy_end):
                return True
    return False

def get_appointment_stylist(stylist_id):
    appointment = Appointment.query.all()
    result = []
    print(appointment)
    for appointment in appointment:
        if appointment.stylistID == stylist_id:
            result.append({
            'date': appointment.date,
            'time': appointment.time.strftime('%H:%M'),
            'service': appointment.serviceID,
            'status': appointment.status
        })
            return result
    return None