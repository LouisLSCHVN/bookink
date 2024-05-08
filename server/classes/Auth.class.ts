import bcrypt from "bcrypt";
import Session from "./Session.class";
import Mail from "./Mail.class";

// Path: server/classes/Auth.class.ts
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
    const query = "SELECT * FROM user WHERE email = ?";
    const result = await db.query(query, [email]);
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
      "INSERT INTO user (user_id, pseudo, email, password) VALUES (?, ?, ?, ?)";
    const result: { affectedRows: number }[] = await db.query(query, [
      generateUUID(),
      pseudo,
      email,
      password,
    ]);
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
   * Get user by token
   * @param {string} token
   * @return {*}  {Promise<User>}
   * @memberof Auth
   */
  public async getUserByAccessToken(token: string): Promise<any | null[]> {
    const session = new Session();
    const user_id = await session.verifyToken(token);
    if (!user_id) return null;

    return await this.getUserById(user_id);
  }

  /**
   * Get user by pseudo
   * @param {string} pseudo
   * @return {*}  {Promise<User>}
   * @memberof User
   */
  public async getUserByPseudo(pseudo: string): Promise<any | null[]> {
    const query = "SELECT * FROM users WHERE pseudo = ?";
    const user = await db.query(query, [pseudo]);
    return db.checkArr(user) ? this.userSaveReturn(user[0]) : null;
  }

  /**
   * Get user by id
   * @param {number} uuid
   * @return {*}  {Promise<User>}
   * @memberof User
   */
  public async getUserById(uuid: string): Promise<any | null[]> {
    const query = "SELECT * FROM user WHERE user_id = ?";
    const user = await db.query(query, [uuid]);
    return db.checkArr(user) ? this.userSaveReturn(user[0]) : null;
  }

  /**
   * Get user by email
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof User
   */
  public async getUserByEmail(email: string): Promise<any | null[]> {
    const query = "SELECT * FROM users WHERE email = ?";
    const user = await db.query(query, [email]);
    return db.checkArr(user) ? this.userSaveReturn(user[0]) : null;
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

    const mail = new Mail();
    await mail.send({
      from: Mail.MAIL_ADDRESS,
      to: email,
      subject: "Confirm your email",
      text: `Click the link to confirm your email: ${process.env.CLIENT_URL}/confirm/${user.user_id}`,
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
    const result: { affectedRows: number }[] = await db.query(query, [uuid]);
    return db.checkResult(result);
  }

  /**
   * Reset a password
   * @param {string} email
   * @return {*}  {Promise<void>}
   * @memberof Auth
   */
  public async resetPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (!user) return;

    const mail = new Mail();
    await mail.send({
      from: Mail.MAIL_ADDRESS,
      to: email,
      subject: "Reset your password",
      text: `Click the link to reset your password: ${process.env.CLIENT_URL}/reset/${user.user_id}`,
    });
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
    const result: { affectedRows: number }[] = await db.query(query, [
      password,
      uuid,
    ]);
    return db.checkResult(result);
  }

  /**
   * Return a user without the password
   * @param {User} user
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public userSaveReturn(user: any): any {
    delete user.password;
    return user;
  }
}
