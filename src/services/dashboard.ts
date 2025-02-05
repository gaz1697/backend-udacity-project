import Client from "../database";

export type order = {
  id?: Number;
  status: string;
  user_id: Number;
};

export class orderDashboard {
  async index(): Promise<order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND order_status='active'";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`could not get orders, ${err} `);
    }
  }
}
