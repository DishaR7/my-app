from enum import Enum

from pydantic import BaseModel


class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    UNAVAILABLE = "Unavailable"


class VehicleCreate(BaseModel):
    plate_number: str
    type: str
    status: VehicleStatus


class VehicleResponse(BaseModel):
    id: int
    plate_number: str
    type: str
    status: VehicleStatus

    model_config = {
        "from_attributes": True
    }