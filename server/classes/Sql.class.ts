import { createPool, Pool, SslOptions } from "mysql2/promise";

interface Options {
  query: string;
  values?: any[];
}

/**
 * Class to handle SQL queries
 *
 * @export
 * @class Sql
 */
export default class Sql {
  private static pool: Pool | null = null;

  /**
   * Create a connection pool
   * @private
   * @static
   * @return {*}
   * @memberof Sql
   */
  private static connect(): Pool {
    if (!this.pool) {
      this.pool = createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 100,
      });
    }
    return this.pool;
  }

  /**
   * Execute a query and return the result
   * @static
   * @template T
   * @param {Options} { query, values }
   * @return {*} {Promise<T[]>}
   * @memberof Sql
   */
  public async query<T>({ query, values }: Options): Promise<T[]> {
    if (!query) throw new Error("Query is cannot be empty");

    const pool = Sql.connect();

    try {
      const [rows] = await pool.query(query, values);
      return rows as T[];
    } catch (error) {
      console.error("Database query error: ", error);
      throw new Error("Database query error");
    }
  }
  /**
   * Close the connection pool
   * @static
   * @memberof Sql
   */
  public async closePool() {
    if (Sql.pool) {
      await Sql.pool.end();
      Sql.pool = null;
    }
  }

  /**
   * Check if the result is valid
   * @param {*} result
   * @return {*}  {boolean}
   * @memberof Sql
   */
  public checkResult(result: any): boolean {
    if (!result || !result.affectedRows) return false;
    return this.checkArr(result.affectedRows);
  }

  /**
   * Check if the array is valid
   *
   * @param {any[]} arr
   * @return {*}  {boolean}
   * @memberof Sql
   */
  public checkArr(arr: any[]): boolean {
    if (!arr) return false;
    return arr.length > 0;
  }
}
