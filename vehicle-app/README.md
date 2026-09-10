# My Vehicle List App

A Vehicle Management application built with React and Express.js.

Features include:

- View all vehicles
- Add new vehicles
- Edit existing vehicles
- Delete vehicles
- Search vehicles by plate number or model
- Filter vehicles by status
- Sort vehicles by plate number or status
- Pagination (10 vehicles per page)
- REST API integration with Express backend
- Unit testing using Vitest and React Testing Library

---

## Project Structure

```text
vehicle-app-extended/

├── backend/
│   ├── server.js                # Express server with CRUD APIs
│   └── package.json

├── vehicle-app/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── VehicleList.jsx
│   │   │   ├── VehicleDetail.jsx
│   │   │   ├── NewVehicleForm.jsx
│   │   │   └── __tests__/
│   │   │       ├── VehicleList.test.jsx
│   │   │       ├── VehicleFilter.test.jsx
│   │   │       └── NewVehicleForm.test.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js           # API service functions
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── data.js
│   │   ├── index.js
│   │   └── setupTests.js
│   │
│   ├── vitest.config.js
│   └── package.json
│
└── README.md
```

---

## Routing

The application uses simple hash-based routing instead of react-router-dom.

Routes:

| Route | Description |
|---------|-------------|
| `#/` | Vehicle List |
| `#/vehicles/new` | Add New Vehicle |
| `#/vehicles/:id` | View/Edit Vehicle |

`App.jsx` listens for hash changes and renders the appropriate component.

---

## Backend API

The backend is built using Express.js.

Base URL:

```text
http://localhost:5000
```

Available endpoints:

### Get All Vehicles

```http
GET /vehicles
```

### Add Vehicle

```http
POST /vehicles
```

### Update Vehicle

```http
PUT /vehicles/:id
```

### Delete Vehicle

```http
DELETE /vehicles/:id
```

Data is stored in memory on the Express server.

---

## Frontend Features

### Search

Users can search vehicles by:

- Plate Number
- Model

### Filter

Vehicles can be filtered by:

- All
- Active
- Maintenance
- Idle

### Sort

Vehicles can be sorted by:

- Plate Number
- Status

### Pagination

The vehicle list is paginated with:

- 10 vehicles per page
- Previous / Next navigation

---

## Error Handling

The application displays user-friendly error messages when:

- Backend server is unavailable
- API requests fail

Example:

```text
Unable to connect to server
```

---

## Testing

The application includes unit tests using:

- Vitest
- React Testing Library
- Jest DOM

Implemented tests:

- Vehicle List rendering test
- Vehicle Filter logic test
- New Vehicle Form test

Run tests:

```bash
npm test
```

Expected result:

```text
3 passed
```

---

## Running the Application

### Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd vehicle-app
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Technologies Used

- React 18
- JavaScript (ES6)
- Express.js
- Node.js
- CSS
- Vitest
- React Testing Library

---

## Author

Vehicle Management App Assignment