/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let vehicles = [
  { id: 1, plate: "TS09AB1234", status: "active", model: "swift" },
  { id: 2, plate: "TS09CD2345", status: "maintenance", model: "Honda City" },
  { id: 3, plate: "TS09EF3456", status: "idle", model: "baleno" },
  { id: 4, plate: "TS09GH4567", status: "active", model: "Tata Nexon" },
  { id: 5, plate: "TS09IJ5678", status: "active", model: "Kia Seltos" },
  { id: 6, plate: "TS09KL6789", status: "active", model: "swift" },
  { id: 7, plate: "TS09MN7890", status: "maintenance", model: "Tata Punch" },
  { id: 8, plate: "TS09OP0123", status: "idle", model: "Mahindra Thar" },
  { id: 9, plate: "TS09QR3241", status: "idle", model: "Audi A4" },
  { id: 10, plate: "TS09ST7629", status: "maintenance", model: "Porsche 911" }
];

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

//GET API
app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

//POST API
app.post("/vehicles", (req, res) => {
  const newVehicle = {
    id: Date.now(),
    ...req.body
  };

  vehicles.push(newVehicle);

  res.status(201).json(newVehicle);
});

//PUT API
app.put("/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);

  vehicles = vehicles.map(vehicle =>
    vehicle.id === id
      ? { ...vehicle, ...req.body }
      : vehicle
  );

  res.json({ message: "Updated" });
});

//DELETE API
app.delete("/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);

  vehicles = vehicles.filter(vehicle => vehicle.id !== id);

  res.json({ message: "Deleted" });
});