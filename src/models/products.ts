import Client from "../database";

export type product = {
  id?: Number;
  p_name: string;
  price: Number;
  category: string;
};

export class productStore {
  async index(): Promise<product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`could not get products, ${err} `);
    }
  }
  async show(id: Number): Promise<product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const results = await conn.query(sql, [id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not get product, ${err} `);
    }
  }
  async create(product: product): Promise<product> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO products (p_name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const results = await conn.query(sql, [product.p_name, product.price, product.category]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not create product, ${err} `);
    }
  }
}
