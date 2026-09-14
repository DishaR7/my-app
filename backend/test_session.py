from database import SessionLocal
from models import Vehicle, VehicleStatus


session = SessionLocal()

try:
    vehicle = Vehicle(
        plate_number="TS09AB1234",
        type="Car",
        status=VehicleStatus.AVAILABLE
    )

    session.add(vehicle)
    session.commit()

    print("Vehicle added successfully!")

    vehicles = session.query(Vehicle).all()

    print("\nVehicles in database:")

    for v in vehicles:
        print(v.id, v.plate_number, v.type, v.status.value)

finally:
    session.close()