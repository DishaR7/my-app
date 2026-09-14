import React, { useState } from "react";

// ---------- DETAIL / EDIT PAGE ----------
function VehicleDetail({ vehicles, id, updateVehicle, deleteVehicle, goTo }) {
  // Find the vehicle matching this id
  let vehicle = vehicles.find((v) => v.id == id);

  const [plateNumber, setPlateNumber] = useState(
    vehicle ? vehicle.plate_number : ""
  );
  const [type, setType] = useState(vehicle ? vehicle.type : "Car");
  const [status, setStatus] = useState(
    vehicle ? vehicle.status : "Available"
  );
  const [savedMsg, setSavedMsg] = useState("");

  if (!vehicle) {
    return (
      <div>
        <p>Sorry, we couldn't find that vehicle.</p>
        <button onClick={() => goTo("/")}>Back to list</button>
      </div>
    );
  }

  async function handleSave() {
    let updated = {
      id: vehicle.id,
      plate_number: plateNumber,
      type: type,
      status: status,
    };

    await updateVehicle(updated);

    setSavedMsg("Saved!");

    setTimeout(() => setSavedMsg(""), 2000);
  }

  function handleDelete() {
    let sure = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (sure) {
      deleteVehicle(vehicle.id);
    }
  }

  return (
    <div>
      <h2>
        Vehicle Details: {vehicle.plate_number}{" "}
        <span
          className={
            "status-badge status-" +
            vehicle.status
          }
        >
          {vehicle.status}
        </span>
      </h2>

      <div className="form-group">
        <label>Plate Number: </label>
        <br />
        <input
          type="text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Type: </label>
        <br />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
          <option value="Truck">Truck</option>
          <option value="Bus">Bus</option>
          <option value="Van">Van</option>
          <option value="SUV">SUV</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status: </label>
        <br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      <button onClick={handleSave}>
        Save Changes
      </button>

      <button
        onClick={handleDelete}
        className="btn-delete"
      >
        Delete Vehicle
      </button>

      <button
        onClick={() => goTo("/")}
        className="btn-cancel"
      >
        Back
      </button>

      {savedMsg && (
        <p className="success-text">
          {savedMsg}
        </p>
      )}
    </div>
  );
}

export default VehicleDetail;