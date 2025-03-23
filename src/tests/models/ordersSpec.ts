import { productStore, product } from "../../models/products";
import { orderStore, order, order_product } from "../../models/orders";
import { userStore, user } from "../../models/users";
const newUserStore = new userStore();
const newOrderStore = new orderStore();
const newProductStore = new productStore();
let test_order: order;
let test_product: product;
let test_user: user;
describe("testing orders model", () => {
  beforeAll(async () => {
    const product: product = {
      p_name: "water",
      price: 20,
      category: "drinks",
    };
    const user: user = {
      first_name: "ab",
      last_name: "ga",
      password: "1234",
    };

    test_product = await newProductStore.create(product);
    test_user = await newUserStore.create(user);
    const order: order = {
      order_status: "active",
      user_id: test_user.id as number,
    };
    test_order = await newOrderStore.create(order);
  });
  it("creating an order", async () => {
    expect(test_order.order_status).toBeDefined();
  });
  it("indexing orders", async () => {
    const results: order[] = await newOrderStore.index();
    expect(results.length).toBeGreaterThan(0);
  });
  it("show an order record", async () => {
    const results: order = await newOrderStore.show("1");
    expect(results.id).toBe(1);
  });
  it("update an order record", async () => {
    const results: order = await newOrderStore.update({ id: test_order.id, order_status: "inactive", user_id: test_order.user_id });
    expect(results.order_status).toBe("inactive");
  });

  afterAll(async () => {
    const deletedOrder: order = await newOrderStore.delete(test_order.id as unknown as string);
    expect(deletedOrder.order_status).toBe("inactive");
  });
});
