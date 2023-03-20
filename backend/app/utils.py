from app import db
from app.models import Notification
import datetime

def send_notification(user_id, stylist_id, message):
    notification = Notification(
        sentDate=datetime.date.today(),
        sentTime=datetime.datetime.now().time(),
        message=message,
        stylistID=stylist_id,
        userID=user_id
    )
    db.session.add(notification)
    db.session.commit()
