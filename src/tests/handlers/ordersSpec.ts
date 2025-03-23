import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
import { product } from "../../models/products";
import { order } from "../../models/orders";
import { user } from "../../models/users";
import { order_product } from "../../models/orders";
let createdProduct: product;
let createdOrder: order;
let createdUser: user;
let token: string;
describe("testing orders handler", () => {
  beforeAll(async () => {
    createdUser = (await request.post("/user").send({ first_name: "ahs", last_name: "sam", password: "1234" })).body;
    token = (await request.post("/user/login").send({ id: createdUser.id, password: "1234" })).body;
    createdProduct = (await request.post("/product").send({ p_name: "pa", price: 10, category: "product" }).auth(token, { type: "bearer" }))
      .body;
    createdOrder = (await request.post("/order").send({ status: "active", user_id: createdUser.id }).auth(token, { type: "bearer" })).body;
  });
  it("testing index endpoint", async () => {
    const response = await request.get("/order/");
    const orders: order[] = response.body;
    expect(orders.length).toBeGreaterThan(0);
  });
  it("testing show endpoint", async () => {
    const response = await request.get(`/order/${createdOrder.id}`).auth(token, { type: "bearer" });
    const order: order = response.body;
    console.log(`order is: ${order}`);
    expect(order.order_status).toBe("active");
  });
  it("testing active orders by user endpoint", async () => {
    const activeOrders: order[] = (await request.get(`/order/active/${createdUser.id}`)).body;
    expect(activeOrders.length).toBeGreaterThan(0);
  });
  it("testing order products endpoint", async () => {
    const createdOrderProduct: order_product = (
      await request
        .post("/order_product")
        .send({ order_id: createdOrder.id, product_id: createdProduct.id, quantity: 10 })
        .auth(token, { type: "bearer" })
    ).body;
    expect(createdOrderProduct.quantity).toBe(10);
  });
});
