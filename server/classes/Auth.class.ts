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
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    const users = await db.query(query, [email, password]);
    return db.checkArr(users);
  }

  /**
   * Signup a user
   * @param {string} pseudo
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async signup(
    pseudo: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const query =
      "INSERT INTO user (user_id, pseudo, email, password) VALUES (?, ?, ?, ?)";
    const result: { affectedRows: number }[] = await db.query(query, [
      generateUUID(),
      pseudo,
      email,
      password,
    ]);
    return db.checkResult(result);
  }

  /**
   * Check if user exists
   * @param {string} pseudo
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async userExists(pseudo: string): Promise<boolean> {
    const query = "SELECT * FROM users WHERE pseudo = ?";
    const users = await db.query(query, [pseudo]);
    return db.checkArr(users);
  }

  /**
   * Check if email exists
   * @param {string} email
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async emailExists(email: string): Promise<boolean> {
    const query = "SELECT * FROM users WHERE email = ?";
    const users = await db.query(query, [email]);
    return db.checkArr(users);
  }
}
