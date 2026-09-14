from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Vehicle Tracker API"
    }

def test_list_vehicles():
    response = client.get("/vehicles")

    assert response.status_code == 200

    vehicles = response.json()

    assert isinstance(vehicles, list)

def test_get_vehicle():
    response = client.get("/vehicles")
    assert response.status_code == 200

    vehicles = response.json()
    vehicle_id = vehicles[0]["id"]

    response = client.get(f"/vehicles/{vehicle_id}")

    assert response.status_code == 200
    vehicle = response.json()

    assert vehicle["id"] == vehicle_id

def test_vehicle_not_found():
    response = client.get("/vehicles/9999")

    assert response.status_code == 404
    assert response.json() == {
        "detail": "Vehicle not found"
    }

def test_add_vehicle():
    new_vehicle = {
        "plate_number": "TS11EF7890",
        "type": "Truck",
        "status": "Available"
    }

    response = client.post("/vehicles", json=new_vehicle)

    assert response.status_code == 201

    vehicle = response.json()

    assert vehicle["plate_number"] == "TS11EF7890"
    assert vehicle["type"] == "Truck"
    assert vehicle["status"] == "Available"

def test_update_vehicle():
    response = client.get("/vehicles")
    assert response.status_code == 200

    vehicles = response.json()
    vehicle_id = vehicles[0]["id"]

    updated_vehicle = {
        "plate_number": "TS09AB1234",
        "type": "Car",
        "status": "Unavailable"
    }

    response = client.put(
        f"/vehicles/{vehicle_id}",
        json=updated_vehicle
    )

    assert response.status_code == 200

    vehicle = response.json()

    assert vehicle["id"] == vehicle_id
    assert vehicle["plate_number"] == "TS09AB1234"
    assert vehicle["type"] == "Car"
    assert vehicle["status"] == "Unavailable"

def test_delete_vehicle():
    response = client.get("/vehicles")
    assert response.status_code == 200

    vehicles = response.json()
    vehicle_id = vehicles[0]["id"]

    response = client.delete(f"/vehicles/{vehicle_id}")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Vehicle deleted successfully"
    }

def test_vehicle_validation_error():
    invalid_vehicle = {
        "plate_number": "TS12GH3456",
        "type": "Car"
        # status is missing
    }

    response = client.post("/vehicles", json=invalid_vehicle)

    assert response.status_code == 422