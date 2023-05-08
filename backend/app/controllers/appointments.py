from app import db
from app.models import Appointment
from datetime import datetime
from datetime import timedelta
from app.models import Service
from datetime import datetime, timezone

def create_appointment(data):
    service = Service.query.get(data['serviceID'])
    if not service:
        return None

    proposed_datetime = data['datetime']

    if is_stylist_busy(data['stylistID'], proposed_datetime, service.duration):
        return None

    appointment = Appointment(
        datetime=proposed_datetime,
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
    busy_times = []
    appointments = Appointment.query.all()

    for appointment in appointments:
        local_start_time = appointment.datetime
        local_end_time = local_start_time + appointment.service.duration

        busy_times.append((appointment.stylistID, local_start_time, local_end_time))  # Include the stylist ID

    return busy_times


def is_stylist_busy(stylist_id, proposed_datetime, service_duration):
    busy_times = get_busy_times()
    duration_minutes = service_duration.total_seconds() / 60
    proposed_datetime = datetime.strptime(proposed_datetime, '%Y-%m-%dT%H:%M:%S')
    proposed_end = proposed_datetime + timedelta(minutes=duration_minutes)

    for busy_stylist_id, busy_start, busy_end in busy_times:  # Update the loop variable
        if stylist_id == busy_stylist_id and proposed_datetime.date() == busy_start.date():
            if (proposed_datetime >= busy_start and proposed_datetime < busy_end) or \
               (proposed_end > busy_start and proposed_end <= busy_end) or \
               (proposed_datetime <= busy_start and proposed_end >= busy_end):
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