import React, { useState, useEffect } from "react";
import "./App.css";
import VehicleList from "./components/VehicleList";
import NewVehicleForm from "./components/NewVehicleForm";
import VehicleDetail from "./components/VehicleDetail";
import { getVehicles, addVehicle as addVehicleApi } from "./services/api";

function App() {
  // this keeps track of which "page" we are on
  // possible values: "list", "new", or a vehicle id (string/number) for detail page
  const [page, setPage] = useState("list");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Load vehicles
  useEffect(() => {
  fetchVehicles();
  }, []);

const fetchVehicles = async () => {
  try {
    setLoading(true);

    const data = await getVehicles();
    console.log("Backend data:", data);

    setVehicles(data);
    setError("");
  } catch (err) {
    console.log("API ERROR:", err);
    setError("Unable to connect to server");
  } finally {
    setLoading(false);
  }
};

  // also handle the browser back/forward button and hash changes
  useEffect(() => {
    function handleHash() {
      let hash = window.location.hash.replace("#", "");
      if (hash === "") {
        setPage("list");
      } else if (hash === "/vehicles/new") {
        setPage("new");
      } else if (hash.indexOf("/vehicles/") === 0) {
        let id = hash.split("/")[2];
        setPage(id);
      }
    }
    window.addEventListener("hashchange", handleHash);
    handleHash(); // check on first load too
    return function () {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  function goTo(hash) {
    window.location.hash = hash;
  }

async function addVehicle(newVehicle) {
  try {
    const savedVehicle = await addVehicleApi(newVehicle);
    console.log("Saved vehicle:", savedVehicle);  

    setVehicles([...vehicles, savedVehicle]);
  } catch (err) {
    setError("Failed to add vehicle");
  }
}

  function updateVehicle(updatedVehicle) {
    let newList = vehicles.map(function (v) {
      if (v.id === updatedVehicle.id) {
        return updatedVehicle;
      } else {
        return v;
      }
    });
    setVehicles(newList);
  }

  function deleteVehicle(id) {
    setVehicles(vehicles.filter((v) => v.id !== id));
  }

  return (
    <div className="app-container">
      <h1>My Vehicle List App</h1>
      <p className="subtitle">Assignment</p>

      {/*Display the error message*/}
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}

      {/* simple nav links */}
      <div className="navbar">
        <a href="#/">Home</a>
        <a href="#/vehicles/new">Add New Vehicle</a>
      </div>

      <hr />

      {loading && <p className="loading-text">Loading, please wait...</p>}  

      {!loading && page === "list" && ( <VehicleList vehicles={vehicles} goTo={goTo} />)}

      {!loading && page === "new" && (
        <NewVehicleForm vehicles={vehicles} addVehicle={addVehicle} goTo={goTo} />
      )}

      {!loading && page !== "list" && page !== "new" && (
        <VehicleDetail
          vehicles={vehicles}
          id={page}
          updateVehicle={updateVehicle}
          deleteVehicle={deleteVehicle}
          goTo={goTo}
        />
      )}
    </div>
  );
}

export default App;