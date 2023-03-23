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

class Appointment(db.Model):
    appointmentID = db.Column(INTEGER(unsigned=True), primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    serviceID = db.Column(INTEGER(unsigned=True), db.ForeignKey('service.serviceID'), nullable=False)
    stylistID = db.Column(INTEGER(unsigned=True), db.ForeignKey('stylist.stylistID'), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    superAppointment = db.Column(db.Boolean, default=False)

class Service(db.Model):
    serviceID = db.Column(INTEGER(unsigned=True), primary_key=True)
    serviceName = db.Column(db.String(255), nullable=False)
    cost = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Interval, nullable=False)

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

class Notification(db.Model):
    notificationID = db.Column(INTEGER(unsigned=True), primary_key=True)
    sentDate = db.Column(db.Date, nullable=False)
    sentTime = db.Column(db.Time, nullable=False)
    message = db.Column(db.Text, nullable=False)
    stylistID = db.Column(INTEGER(unsigned=True), db.ForeignKey('stylist.stylistID'), nullable=False)
    userID = db.Column(INTEGER(unsigned=True), db.ForeignKey('user.userID'), nullable=False)

class Salon(db.Model):
    salonID = db.Column(INTEGER(unsigned=True), primary_key=True)
    description = db.Column(db.Text, nullable=True)
    startTime = db.Column(db.Time, nullable=False)
    closeTime = db.Column(db.Time, nullable=False)
