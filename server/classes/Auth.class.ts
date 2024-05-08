import { db } from "../utils/database";
export default class Auth {
  /**
   * Login a user
   * @static
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async login(email: string, password: string): Promise<boolean> {
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const users = await db.query(query, [email, password]);
    return db.checkArr(users);
  }

  /**
   * Signup a user
   * @param {string} username
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async signup(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const query =
      "INSERT INTO user (user_id, username, email, password) VALUES (?, ?, ?, ?)";
    const result: { affectedRows: number }[] = await db.query(query, [
      generateUUID(),
      username,
      email,
      password,
    ]);
    return db.checkResult(result);
  }
}
