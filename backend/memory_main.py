from enum import Enum

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "https://my-app-disha-91b5.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    UNAVAILABLE = "Unavailable"


class Vehicle(BaseModel):
    id: int
    plate_number: str
    type: str
    status: VehicleStatus


vehicles = [
    Vehicle(
        id=1,
        plate_number="TS10CD5678",
        type="Bike",
        status=VehicleStatus.AVAILABLE,
    ),
    Vehicle(
        id=2,
        plate_number="TS11EF7890",
        type="Truck",
        status=VehicleStatus.AVAILABLE,
    ),
]


@app.get("/")
def root():
    return {"message": "Vehicle Tracker API"}


@app.get("/vehicles", response_model=list[Vehicle])
def list_vehicles():
    return vehicles


@app.get("/vehicles/{vehicle_id}", response_model=Vehicle)
def get_vehicle(vehicle_id: int):

    for vehicle in vehicles:
        if vehicle.id == vehicle_id:
            return vehicle

    raise HTTPException(
        status_code=404,
        detail="Vehicle not found"
    )


@app.post("/vehicles", response_model=Vehicle, status_code=201)
def add_vehicle(vehicle: Vehicle):

    vehicles.append(vehicle)

    return vehicle


@app.put("/vehicles/{vehicle_id}", response_model=Vehicle)
def update_vehicle(vehicle_id: int, updated_vehicle: Vehicle):

    for index, vehicle in enumerate(vehicles):

        if vehicle.id == vehicle_id:

            updated_vehicle.id = vehicle_id
            vehicles[index] = updated_vehicle

            return updated_vehicle

    raise HTTPException(
        status_code=404,
        detail="Vehicle not found"
    )


@app.delete("/vehicles/{vehicle_id}")
def delete_vehicle(vehicle_id: int):

    for index, vehicle in enumerate(vehicles):

        if vehicle.id == vehicle_id:

            vehicles.pop(index)

            return {
                "message": "Vehicle deleted successfully"
            }

    raise HTTPException(
        status_code=404,
        detail="Vehicle not found"
    )