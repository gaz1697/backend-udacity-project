import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
import { user } from "../../models/users";
let createdUser: user;
describe("testing users handler", () => {
  beforeAll(async () => {
    createdUser = (await request.post("/user").send({ first_name: "ah", last_name: "sa", password: "1234" })).body;
    //   console.log(createdUser);
  });
  it("testing index endpoint", async () => {
    const response = await request.get("/user/");
    //   console.log(response.body);
    const users: user[] = response.body;
    expect(users.length).toBeGreaterThan(0);
  });
  it("testing show and authenticate endpoint", async () => {
    const token = await request.post("/user/login").send({ id: createdUser.id, password: "1234" });
    const response = await request.get(`/user/${createdUser.id}`).auth(token.body, { type: "bearer" });
    const user: user = response.body;
    expect(user.first_name).toBe("ah");
  });
});
