import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
import { product } from "../../models/products";
let createdProduct: product;
describe("testing products handler", () => {
  beforeAll(async () => {
    const createdUser = (await request.post("/user").send({ first_name: "ahs", last_name: "sam", password: "1234" })).body;
    const token = (await request.post("/user/login").send({ id: createdUser.id, password: "1234" })).body;
    createdProduct = (await request.post("/product").send({ p_name: "pa", price: 10, category: "product" }).auth(token, { type: "bearer" }))
      .body;
  });
  it("testing index endpoint", async () => {
    const response = await request.get("/product/");
    const products: product[] = response.body;
    expect(products.length).toBeGreaterThan(0);
  });
  it("testing show endpoint", async () => {
    const response = await request.get(`/product/${createdProduct.id}`);
    const product: product = response.body;
    expect(product.p_name).toBe("pa");
  });
});
