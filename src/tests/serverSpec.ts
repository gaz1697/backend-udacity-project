import supertest from "supertest";
import app from "../server";

const request = supertest(app);

describe("testing the server to ensure its running", (): void => {
  it("gets the server endpoint", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.text).toBe("store backend api");
  });
  it("receives a 404 response for unavailable endpoints", async (): Promise<void> => {
    const response = await request.get("/unavailable");
    expect(response.status).toBe(404);
  });
});
