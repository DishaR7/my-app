import React, { useState } from "react";

function VehicleList({ vehicles, goTo }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  if (vehicles.length === 0) {
    return (
      <div className="empty-box">
        <p>No vehicles found. Add one to get started!</p>
      </div>
    );
  }

  const filteredVehicles = vehicles.filter((vehicle) => {
    const plateNumber = vehicle.plate_number || "";
    const type = vehicle.type || "";
    const status = vehicle.status || "";

    const matchesSearch =
      plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      type.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const sortedVehicles = [...filteredVehicles];

  if (sortBy === "plate") {
    sortedVehicles.sort((a, b) =>
      (a.plate_number || "").localeCompare(b.plate_number || "")
    );
  }

  if (sortBy === "status") {
    sortedVehicles.sort((a, b) =>
      (a.status || "").localeCompare(b.status || "")
    );
  }

  const ITEMS_PER_PAGE = 6;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedVehicles = sortedVehicles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <h2>All Vehicles ({vehicles.length})</h2>

      <div
        className="search-box"
        style={{ display: "flex", gap: "20px" }}
      >
        <input
          type="text"
          placeholder="Search by plate number..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="plate">Plate Number</option>
          <option value="status">Status</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Type</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {paginatedVehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.plate_number}</td>
              <td>{v.type}</td>
              <td>{v.status}</td>
              <td>
                <button onClick={() => goTo("/vehicles/" + v.id)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page}
        </span>

        <button
          disabled={
            startIndex + ITEMS_PER_PAGE >= sortedVehicles.length
          }
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VehicleList;