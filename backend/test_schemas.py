from schemas import VehicleCreate, VehicleResponse
from models import Vehicle
from database import SessionLocal


# -----------------------------
# Pydantic → SQLAlchemy
# -----------------------------

vehicle_data = VehicleCreate(
    plate_number="TS10CD5678",
    type="Bike",
    status="Available"
)

print("Pydantic validation successful!")
print(vehicle_data)


vehicle = Vehicle(
    plate_number=vehicle_data.plate_number,
    type=vehicle_data.type,
    status=vehicle_data.status.value
)

print("\nSQLAlchemy model created!")
print(vehicle.plate_number, vehicle.type, vehicle.status)


# -----------------------------
# Save to MySQL
# -----------------------------

session = SessionLocal()

try:
    session.add(vehicle)
    session.commit()
    session.refresh(vehicle)

    print("\nVehicle saved to MySQL!")
    print(vehicle.id, vehicle.plate_number, vehicle.type, vehicle.status)

    # -----------------------------
    # SQLAlchemy → Pydantic
    # -----------------------------

    response = VehicleResponse.model_validate(vehicle)

    print("\nPydantic response created!")
    print(response)

finally:
    session.close()