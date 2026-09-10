import { test, expect } from "vitest";
test("filters active vehicles", () => {
  const vehicles = [
    { id: 1, status: "active" },
    { id: 2, status: "maintenance" }
  ];

  const result = vehicles.filter(
    (v) => v.status === "active"
  );

  expect(result.length).toBe(1);
});