import { render, screen } from "@testing-library/react";
import NewVehicleForm from "../NewVehicleForm";
import { test, expect } from "vitest";

test("shows plate number field", () => {
  render(
    <NewVehicleForm
      vehicles={[]}
      addVehicle={() => {}}
      goTo={() => {}}
    />
  );

  expect(
    screen.getByText(/Plate Number/i)
  ).toBeInTheDocument();
});