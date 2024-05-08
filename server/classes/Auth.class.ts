import { db } from "../utils/database";
import bcrypt from "bcrypt";

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
    // Hash the password
    password = await this.hashPassword(password);
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

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
