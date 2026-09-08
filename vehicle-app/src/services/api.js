const API_URL = "http://localhost:5000";

export async function getVehicles() {
  const response = await fetch(`${API_URL}/vehicles`);
  return response.json();
}

export async function addVehicle(vehicle) {
  const response = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vehicle)
  });

  return response.json();
}

export async function deleteVehicle(id) {
  return fetch(`${API_URL}/vehicles/${id}`, {
    method: "DELETE"
  });
}

export async function updateVehicle(id, vehicle) {
  return fetch(`${API_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vehicle)
  });
}