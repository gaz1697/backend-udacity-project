import { productStore, product } from "../../models/products";

const newProductStore = new productStore();
let test_product: product;
describe("testing products model", () => {
  beforeAll(async () => {
    const product: product = {
      p_name: "water",
      price: 20,
      category: "drinks",
    };
    test_product = await newProductStore.create(product);
  });
  it("creating a product", async () => {
    expect(test_product.p_name).toBe("water");
  });
  it("indexing products", async () => {
    const results: product[] = await newProductStore.index();
    expect(results.length).toBeGreaterThan(0);
  });
  it("show a product record", async () => {
    const results: product = await newProductStore.show(test_product.id as unknown as string);
    expect(results.p_name).toBe("water");
  });
  it("update a product record", async () => {
    const results: product = await newProductStore.update({ id: test_product.id, p_name: "water", price: 10, category: "ma" });
    expect(results.category).toBe("ma");
  });

  afterAll(async () => {
    const deletedProduct: product = await newProductStore.delete(test_product.id as unknown as string);
    expect(deletedProduct.category).toBe("ma");
  });
});
