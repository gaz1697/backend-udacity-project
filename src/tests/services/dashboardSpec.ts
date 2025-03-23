import supertest from "supertest";
import { orderDashboard } from "../../services/dashboard";
import { order } from "../../models/orders";
const dashboard = new orderDashboard();

describe("testing dashboard functionality", () => {
  it("should return a list of a specific user active orders", async () => {
    const orders = await dashboard.index(1);
    expect(orders).toBeInstanceOf(Array);
  });
});
