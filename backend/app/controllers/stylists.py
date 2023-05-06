from app import db
from app.models import Stylist

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