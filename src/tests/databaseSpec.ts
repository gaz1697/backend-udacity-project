import client from "../database";
import { PoolClient } from "pg";
let conn: PoolClient;
describe("testing database connection", () => {
  beforeAll(async () => {
    conn = await client.connect();
  });
  it("should connect without issues", async () => {
    expect(conn).toBeDefined();
  });
  afterAll(() => {
    conn.release();
  });
});
