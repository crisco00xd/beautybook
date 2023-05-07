from app import db
from sqlalchemy.dialects.mysql import INTEGER
from flask_login import UserMixin

class User(db.Model, UserMixin):
    userID = db.Column(INTEGER(unsigned=True), primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    roles = db.Column(db.String(80), nullable=True)
    is_superuser = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'userID': self.userID,
            'email': self.email,
            'phone': self.phone,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'roles': self.roles,
            'is_superuser': self.is_superuser
        }

    def get_id(self):
        return str(self.userID)

class Appointment(db.Model):
    appointmentID = db.Column(INTEGER(unsigned=True), primary_key=True)
    datetime = db.Column(db.DateTime, nullable=False)
    serviceID = db.Column(INTEGER(unsigned=True), db.ForeignKey('service.serviceID'), nullable=False)
    stylistID = db.Column(INTEGER(unsigned=True), db.ForeignKey('stylist.stylistID'), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    superAppointment = db.Column(db.Boolean, default=False)
    service = db.relationship('Service', backref=db.backref('appointments', lazy=True))

    def serialize(self):
        return {
            'appointmentID': self.appointmentID,
            'datetime': self.datetime.isoformat(),
            'serviceID': self.serviceID,
            'stylistID': self.stylistID,
            'status': self.status,
            'superAppointment': self.superAppointment
        }

class Service(db.Model):
    serviceID = db.Column(INTEGER(unsigned=True), primary_key=True)
    serviceName = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Interval, nullable=False)
    
    def serialize(self):
        return {
            'serviceID': self.serviceID,
            'serviceName': self.serviceName,
            'cost': self.cost,
            'description': self.description,
            'duration': self.duration.isoformat()
        }

stylist_services = db.Table('stylist_services',
    db.Column('stylistID', INTEGER(unsigned=True), db.ForeignKey('stylist.stylistID'), primary_key=True),
    db.Column('serviceID', INTEGER(unsigned=True), db.ForeignKey('service.serviceID'), primary_key=True)
)


class Stylist(db.Model):
    stylistID = db.Column(INTEGER(unsigned=True), primary_key=True)
    salonID = db.Column(INTEGER(unsigned=True), db.ForeignKey('salon.salonID'), nullable=False)
    userID = db.Column(INTEGER(unsigned=True), db.ForeignKey('user.userID'), nullable=False)
    services = db.relationship('Service', secondary=stylist_services, backref=db.backref('stylists', lazy=True))
    admin = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'stylistID': self.stylistID,
            'salonID': self.salonID,
            'userID': self.userID,
            'services': [service.serialize() for service in self.services],
            'admin': self.admin
        }

class Notification(db.Model):
    notificationID = db.Column(INTEGER(unsigned=True), primary_key=True)
    sentDate = db.Column(db.Date, nullable=False)
    sentTime = db.Column(db.Time, nullable=False)
    message = db.Column(db.Text, nullable=False)
    stylistID = db.Column(INTEGER(unsigned=True), db.ForeignKey('stylist.stylistID'), nullable=False)
    userID = db.Column(INTEGER(unsigned=True), db.ForeignKey('user.userID'), nullable=False)

    def serialize(self):
        return {
            'notificationID': self.notificationID,
            'sentDate': self.sentDate.isoformat(),
            'sentTime': self.sentTime.isoformat(),
            'message': self.message,
            'stylistID': self.stylistID,
            'userID': self.userID
        }

class Salon(db.Model):
    salonID = db.Column(INTEGER(unsigned=True), primary_key=True)
    salon_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    startTime = db.Column(db.Time, nullable=False)
    closeTime = db.Column(db.Time, nullable=False)

    def serialize(self):
        return {
            'salonID': self.salonID,
            'salon_name': self.salon_name,
            'description': self.description,
            'startTime': self.startTime.isoformat(),
            'closeTime': self.closeTime.isoformat()
        }
