from app import db
from app.models import Notification
import datetime
from app.controllers import stylists

def send_notification(stylist_id, message):
    data = stylists.get_stylist(stylist_id)
    notification = Notification(
        sentDate=datetime.date.today(),
        sentTime=datetime.datetime.now().time(),
        message=message,
        stylistID=stylist_id,
        userID=data.userID
    )
    db.session.add(notification)
    db.session.commit()
