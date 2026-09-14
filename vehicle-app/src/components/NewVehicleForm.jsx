import React, { useState } from "react";

// ---------- ADD NEW VEHICLE PAGE ----------
function NewVehicleForm({ vehicles, addVehicle, goTo }) {
  const [plateNumber, setPlateNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("Available");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (plateNumber.trim() === "") {
      setErrorMsg("Plate number is required!");
      return;
    }

    // Check plate number is unique
    let alreadyExists = false;

    for (let i = 0; i < vehicles.length; i++) {
      if (
        vehicles[i].plate_number.toLowerCase() ===
        plateNumber.trim().toLowerCase()
      ) {
        alreadyExists = true;
      }
    }

    if (alreadyExists) {
      setErrorMsg("This plate number is already taken!");
      return;
    }

    if (type === "") {
      setErrorMsg("Please select a vehicle type!");
      return;
    }

    // Data matching FastAPI VehicleCreate schema
    let newVehicle = {
      plate_number: plateNumber.trim(),
      type: type,
      status: status,
    };

    await addVehicle(newVehicle);
    goTo("/");
  }

  return (
    <div>
      <h2>Add New Vehicle</h2>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
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
            <option value="">-- choose one --</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="SUV">SUV</option>
            <option value="Bus">Bus</option>
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

        <button type="submit">Save Vehicle</button>

        <button
          type="button"
          className="btn-cancel"
          onClick={() => goTo("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewVehicleForm;