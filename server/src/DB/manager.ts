import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export class DataBase {
  private static instance: DataBase | null = null;
  private pool: mysql.Pool;
  static gI() {
    if (this.instance === null) {
      this.instance = new DataBase();
    }
    return this.instance;
  }
  constructor() {
    console.log(process.env.HOST, process.env.USER_NAME, process.env.PASSWORD)
    this.pool = mysql.createPool({
      host: process.env.HOST || "localhost",
      user: process.env.USER_NAME || "root",
      password: process.env.PASSWORD || "123456",
      database: process.env.NAME_DB || "my_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async query(sql: string, params?: any[]) {
    const connection = await this.pool.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return rows;
    } finally {
      connection.release();
    }
  }
}
