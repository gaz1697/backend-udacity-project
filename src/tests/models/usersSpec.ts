import { userStore, user } from "../../models/users";
const newUserStore = new userStore();

let test_user: user;
describe("testing users model", () => {
  beforeAll(async () => {
    const user: user = {
      first_name: "ab",
      last_name: "ga",
      password: "1234",
    };
    test_user = await newUserStore.create(user);
  });
  it("creating a user", async () => {
    expect(test_user.first_name).toBe("ab");
  });
  it("indexing users", async () => {
    const results: user[] = await newUserStore.index();
    expect(results.length).toBeGreaterThan(0);
  });
  it("show a user record", async () => {
    const results = await newUserStore.show(test_user.id as unknown as string);
    expect(results.first_name).toBe("ab");
  });
  it("update a user record", async () => {
    const results = await newUserStore.update({ id: 1, first_name: "ab", last_name: "sm", password: "1234" });
    expect(results.last_name).toBe("sm");
  });

  afterAll(async () => {
    const deletedUser: user = await newUserStore.delete(test_user.id as unknown as string);
    expect(deletedUser.first_name).toBe("ab");
  });
});
