import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VehicleList from "../VehicleList";

test("renders vehicle list", () => {
  const vehicles = [
    {
      id: 1,
      plate: "TS09AB1234",
      model: "Swift",
      status: "active"
    }
  ];

  render(
    <VehicleList
      vehicles={vehicles}
      goTo={() => {}}
    />
  );

  expect(
    screen.getByText("TS09AB1234")
  ).toBeInTheDocument();
});