import React, { useState } from "react";

// ---------- ADD NEW VEHICLE PAGE ----------
function NewVehicleForm({ vehicles, addVehicle, goTo }) {
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("Active");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // check plate is filled in
    if (plate.trim() === "") {
      setErrorMsg("Plate number is required!");
      return;
    }

    // check plate is unique (not already used)
    let alreadyExists = false;
    for (let i = 0; i < vehicles.length; i++) {
      if (vehicles[i].plate.toLowerCase() === plate.trim().toLowerCase()) {
        alreadyExists = true;
      }
    }
    if (alreadyExists) {
      setErrorMsg("This plate number is already taken!");
      return;
    }

    // check type is selected
    if (type === "") {
      setErrorMsg("Please select a vehicle type!");
      return;
    }

    // if we get here, everything is good
    let newVehicle = {
      id: Date.now(), // just use timestamp as a simple unique id
      plate: plate.trim(),
      model: model,
      status: status,
    };

    await addVehicle(newVehicle);
    goTo("/"); // go back to list after saving
  }

  return (
    <div>
      <h2>Add New Vehicle</h2>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plate Number: </label>
          <br />
          <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Type: </label>
          <br />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">-- choose one --</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Motorcycle">Motorcycle</option>
            <option value="Bus">Bus</option>
          </select>
        </div>



        <div className="form-group">
          <label>Model: </label>
          <br />
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>


        <div className="form-group">
          <label>Status: </label>
          <br />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Idle">Idle</option>
          </select>
        </div>

        <button type="submit">Save Vehicle</button>
        <button type="button" className="btn-cancel" onClick={() => goTo("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewVehicleForm;
