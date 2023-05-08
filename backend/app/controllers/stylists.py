from app import db
from app.models import Stylist, Salon, Appointment
from app.controllers import salons

def create_stylist(data):
    #Checks if stylist already exists
    # if stylist_exist(data['stylistID']):
    #     return None
    
    stylist = Stylist(
        salonID = data['salonID'],
        userID = data['userID'],
        services = data['services'],
        admin = data['admin']
    )
    
    db.session.add(stylist)
    db.session.commit()
    return stylist
    
def get_stylist(stylist_id):
    return Stylist.query.get(stylist_id)

def get_all_stylist():
    return Stylist.query.all()

def get_all_stylist_by_owner(owner_id):
    salonss = salons.get_all_salon()
    stylists = get_all_stylist()
    result = []

    for stylist in stylists:
        if(stylist.userID == owner_id):
            stylist_owner_ID = stylist

    for salon in salonss:
        for stylist in stylists:
            if salon.salonID == stylist_owner_ID.salonID and stylist.salonID == salon.salonID:
                result.append(stylist)
    return result

def update_stylist(stylist_id, data):
    stylist = Stylist.query.get(stylist_id)
    if not stylist:
        return None

    for key, value in data.items():
        if hasattr(stylist, key):
            setattr(stylist, key, value)

    db.session.commit()
    return stylist

def delete_stylist(stylist_id):
    stylist = Stylist.query.get(stylist_id)
    if stylist:
        db.session.delete(stylist)
        db.session.commit()
        return True
    return False

def stylist_exist(stylist_id):
    stylists = get_all_stylist()
    for stylist in stylists:
        if stylist.stylistID == stylist_id:
            return True
    return False

def get_appointments_of_stylist_by_status(stylist_id, status):
    appointments = Appointment.query.filter_by(stylistID=stylist_id, status=status).all()
    return appointments

def is_owner_by_user_id(user_id):
    stylist = Stylist.query.filter_by(userID=user_id).first()
    if stylist:
        return stylist.admin
    return False

