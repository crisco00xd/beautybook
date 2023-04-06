from app import db
from app.models import Notification

def create_notification(data):
    notification = Notification(
        sentDate = data['sentDate'],
        sentTime = data['sentTime'],
        message = data['message'],
        stylistID = data['stylistID'],
        userID = data['userID']
    )
    
    db.session.add(notification)
    db.session.commit()
    return notification
    
def get_notification(notification_id):
    return Notification.query.get(notification_id)

def get_all_notification():
    return Notification.query.all()

def update_notification(notification_id, data):
    notification = Notification.query.get(notification_id)
    if not notification:
        return None

    for key, value in data.items():
        if hasattr(notification, key):
            setattr(notification, key, value)

    db.session.commit()
    return notification

def delete_notification(notification_id):
    notification = Notification.query.get(notification_id)
    if notification:
        db.session.delete(notification)
        db.session.commit()
        return True
    return False