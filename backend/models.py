from enum import Enum

from sqlalchemy import String, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    UNAVAILABLE = "Unavailable"


class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    plate_number: Mapped[str] = mapped_column(String(20), nullable=False)
    type: Mapped[str] = mapped_column(String(50), nullable=False)
    status: Mapped[VehicleStatus] = mapped_column(
        SQLEnum(VehicleStatus),
        nullable=False
    )