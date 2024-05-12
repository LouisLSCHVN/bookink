import { mail } from "../../utils/classes";
import User from "./User.class";
import bcrypt from "bcrypt";

// Path: server/classes/Auth.class.ts
export default class Auth extends User {
  /**
   * Login a user
   * @static
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async login(email: string, password: string): Promise<boolean> {
    const query = "SELECT * FROM user WHERE email = ?";
    const result = await db.query({
      query: query,
      values: [email],
    });
    if (result.length === 0) return false;
    const user = result[0] as any;
    return await this.comparePassword(password, user.password);
  }

  /**
   * Signup a user
   * Validate the user, hash the password, and send a confirmation email
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
    // Check if the user already exists
    const user = await this.getUserByEmail(email);
    if (user) return false;

    // Hash the password
    password = await this.hashPassword(password);
    const query =
      "INSERT INTO user (user_id, pseudo, email, password, double_auth_code) VALUES (?, ?, ?, ?, ?)";
    const result: { affectedRows: number }[] = await db.query({
      query: query,
      values: [
        generateUUID(),
        pseudo,
        email,
        password,
        this.generateDoubleAuthCode(),
      ],
    });
    await this.sendConfirmationEmail(email);
    return db.checkResult(result);
  }

  /**
   * Hash a password
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof Auth
   */
  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  /**
   * Compare a password with a hash
   * @param {string} password
   * @param {string} hash
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Send a confirmation email
   * @param {string} email
   * @return {*}  {Promise<void>}
   * @memberof Auth
   */
  public async sendConfirmationEmail(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) return;

    await mail.send({
      from: mail.getAddress(),
      to: email,
      subject: "Bookink ~ Confirm your email",
      html: `Click the link to confirm your email: <a href="${process.env.CLIENT_URL}/api/user/confirm/${user.user_id}">Confirm</a>`,
    });
  }

  /**
   * Confirm an email
   * @param {string} uuid
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async confirmEmail(uuid: string): Promise<boolean> {
    const user = await this.getUserById(uuid);
    if (!user) return false;

    const query = "UPDATE user SET is_verified = 1 WHERE user_id = ?";
    const result: { affectedRows: number }[] = await db.query({
      query: query,
      values: [uuid],
    });
    return db.checkResult(result);
  }

  /**
   * Reset a password
   * @param {string} email
   * @return {*}  {Promise<void>}
   * @memberof Auth
   */
  public async resetPassword(email: string): Promise<Boolean> {
    const user = await this.getUserByEmail(email);
    if (!user) return false;

    const sent = await mail.send({
      from: mail.getAddress(),
      to: email,
      subject: "Bookink ~ Reset your password",
      html: `Click the link to reset your password: <a href="${process.env.CLIENT_URL}/account/reset-password/${user.user_id}">Reset</a>`,
    });
    return sent;
  }

  /**
   * Update a password
   * @param {string} uuid
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public async updatePassword(
    uuid: string,
    password: string
  ): Promise<boolean> {
    password = await this.hashPassword(password);
    const query = "UPDATE user SET password = ? WHERE user_id = ?";
    const result: { affectedRows: number }[] = await db.query({
      query: query,
      values: [password, uuid],
    });
    console.log(result);
    console.log(db.checkResult(result));
    console.log(uuid, password);
    return db.checkResult(result);
  }
}
