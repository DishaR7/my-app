from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas import VehicleCreate, VehicleResponse
from database import SessionLocal
from models import Vehicle

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Vehicle Tracker API"}


@app.get("/vehicles", response_model=list[VehicleResponse])
def list_vehicles(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).all()
    return vehicles

@app.get("/vehicles/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    return vehicle

@app.post("/vehicles", response_model=VehicleResponse, status_code=201)
def add_vehicle(vehicle_data: VehicleCreate, db: Session = Depends(get_db)):
    vehicle = Vehicle(
        plate_number=vehicle_data.plate_number,
        type=vehicle_data.type,
        status=vehicle_data.status.value
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle

@app.put("/vehicles/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(
    vehicle_id: int,
    vehicle_data: VehicleCreate,
    db: Session = Depends(get_db)
):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    vehicle.plate_number = vehicle_data.plate_number
    vehicle.type = vehicle_data.type
    vehicle.status = vehicle_data.status.value

    db.commit()
    db.refresh(vehicle)

    return vehicle

@app.delete("/vehicles/{vehicle_id}")
def delete_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")

    db.delete(vehicle)
    db.commit()

    return {"message": "Vehicle deleted successfully"}