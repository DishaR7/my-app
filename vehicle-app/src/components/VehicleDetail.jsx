import React, { useState } from "react";

// ---------- DETAIL / EDIT PAGE ----------
function VehicleDetail({ vehicles, id, updateVehicle, deleteVehicle, goTo }) {
  // find the vehicle matching this id
  // note: id from the url is a string, but vehicle.id might be a number, so use ==
  let vehicle = vehicles.find((v) => v.id == id);


  const [model, setModel] = useState(vehicle ? vehicle.model : "");
  const [type, setType] = useState(vehicle ? vehicle.type : "Sedan");
  const [status, setStatus] = useState(vehicle ? vehicle.status : "Active");
  const [savedMsg, setSavedMsg] = useState("");
  const [search, setSearch] = useState("");

  if (!vehicle) {
    return (
      <div>
        <p>Sorry, we couldn't find that vehicle.</p>
        <button onClick={() => goTo("/")}>Back to list</button>
      </div>
    );
  }

  function handleSave() {
  let updated = {
    id: vehicle.id,
    plate: vehicle.plate,
    model: model,
    status: status,
  };

    updateVehicle(updated);
    setSavedMsg("Saved!");
    // clear the message after a couple seconds
    setTimeout(() => setSavedMsg(""), 2000);
  }

  function handleDelete() {
    let sure = window.confirm("Are you sure you want to delete this vehicle?");
    if (sure) {
      deleteVehicle(vehicle.id);
      goTo("/");
    }
  }

  return (
    <div>
      <h2>
        Vehicle Details: {vehicle.plate}{" "}
        <span className={"status-badge status-" + vehicle.status}>{vehicle.status}</span>
      </h2>

      <div className="form-group">
        <label>Type: </label>
        <br />
        <select value={type} onChange={(e) => setType(e.target.value)}>
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

      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete} className="btn-delete">
        Delete Vehicle
      </button>
      <button onClick={() => goTo("/")} className="btn-cancel">
        Back
      </button>

      {savedMsg && <p className="success-text">{savedMsg}</p>}
    </div>
  );
}

export default VehicleDetail;
