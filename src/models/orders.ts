import Client from "../database";

export type order = {
  id?: Number;
  status: string;
  user_id: Number;
};

export type order_product = {
  order_id: Number;
  product_id: Number;
  quantity: Number;
};

export class orderStore {
  async index(): Promise<order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`could not get orders, ${err} `);
    }
  }
  async show(id: string): Promise<order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const results = await conn.query(sql, [id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not get order, ${err} `);
    }
  }
  async create(order: order): Promise<order> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO orders (order_status, user_id) VALUES ($1, $2) RETURNING *";
      const results = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not create order, ${err} `);
    }
  }

  async update(order: order): Promise<order> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE orders SET order_status= $1, user_id = $2 WHERE id = $3 RETURNING *";
      const results = await conn.query(sql, [order.status, order.user_id, order.id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not update orderr, ${err} `);
    }
  }

  async delete(id: string): Promise<order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const results = await conn.query(sql, [id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not delete order, ${err} `);
    }
  }

  async addProduct(order_product: order_product): Promise<order_product> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const results = await conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not create add product, ${err} `);
    }
  }
}
