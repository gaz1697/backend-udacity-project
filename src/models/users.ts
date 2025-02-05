import Client from "../database";

export type user = {
  id?: Number;
  first_name: string;
  last_name: string;
  password: string;
};

export class userStore {
  async index(): Promise<user[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const results = await conn.query(sql);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`could not get users, ${err} `);
    }
  }
  async show(id: string): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const results = await conn.query(sql, [id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not get user, ${err} `);
    }
  }
  async create(user: user): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";
      const results = await conn.query(sql, [user.first_name, user.last_name, user.password]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not create user, ${err} `);
    }
  }

  async update(user: user): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = "UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id = $4 RETURNING *";
      const results = await conn.query(sql, [user.first_name, user.last_name, user.password, user.id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not update user, ${err} `);
    }
  }

  async delete(id: string): Promise<user> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
      const results = await conn.query(sql, [id]);
      conn.release();
      return results.rows[0];
    } catch (err) {
      throw new Error(`could not delete user, ${err} `);
    }
  }
}
