from app import db
from app.models import Service
from app.models import Service

def create_service(data):
    #Checks if service already exists
    # if service_exist(data['serviceID']):
    #     return None
    
    service = Service(
        name = data['name'],
        cost = data['cost'],
        description = data['description'],
        duration = data['duration']
    )
    
    db.session.add(service)
    db.session.commit()
    return service
    
def get_service(service_id):
    return Service.query.get(service_id)

def get_all_service():
    return Service.query.all()

def update_service(service_id, data):
    service = Service.query.get(service_id)
    if not service:
        return None

    for key, value in data.items():
        if hasattr(service, key):
            setattr(service, key, value)

    db.session.commit()
    return service

def delete_service(service_id):
    service =Service.query.get(service_id)
    if service:
        db.session.delete(service)
        db.session.commit()
        return True
    return False

def service_exist(service_id):
    services = get_all_service()
    for service in services:
        if service.serviceID == service_id:
            return True
    return False