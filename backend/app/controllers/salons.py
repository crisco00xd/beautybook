from app import db
from app.models import Salon
from app.controllers import stylists, salons

def create_salon(data):
    #Checks if salon already exists
    # if salon_exist(data['salonID']):
    #     return None
    
    salon = Salon(
        salon_name = data['salon_name'],
        description = data['description'],
        startTime = data['startTime'],
        closeTime = data['closeTime']
    )
    
    db.session.add(salon)
    db.session.commit()
    return salon
    
def get_salon(salon_id):
    return Salon.query.get(salon_id)

def get_all_salon():
    return Salon.query.all()

def update_salon(salon_id, data):
    salon = Salon.query.get(salon_id)
    if not salon:
        return None

    for key, value in data.items():
        if hasattr(salon, key):
            setattr(salon, key, value)

    db.session.commit()
    return salon

def delete_salon(salon_id):
    salon = Salon.query.get(salon_id)
    if salon:
        db.session.delete(salon)
        db.session.commit()
        return True
    return False

def salon_exist(salon_id):
    salons = get_all_salon()
    for salon in salons:
        if salon.salonID == salon_id:
            return True
    return False

def get_all_salons_by_owner(owner_id):
    salonss = salons.get_all_salon()
    all_stylist = stylists.get_all_stylist()
    result = []

    for stylist in all_stylist:
        if(stylist.userID == owner_id):
            stylist_owner_ID = stylist

    for salon in salonss:
        if salon.salonID == stylist_owner_ID.salonID:
            result.append(salon)
            
    return result