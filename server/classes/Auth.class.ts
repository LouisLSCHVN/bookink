import bcrypt from "bcrypt";
import * as session from "jsonwebtoken";

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
    return db.checkArr(user) ? user[0] : null;
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
    return db.checkArr(user) ? user[0] : null;
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
    return db.checkArr(user) ? user[0] : null;
  }
}

class Session {
  private JWT_SECRET: string = process.env.JWT_SECRET!;

  /**
   * Check if JWT_SECRET is defined
   * @memberof Session
   */
  public checkJWTSecret(): void {
    if (!this.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
  }

  /**
   * Generate a token
   * @param {string} user_id
   * @return {*}  {string}
   * @memberof Session
   */
  public generateToken(user_id: string): string {
    this.checkJWTSecret();
    return session.sign({ user_id }, this.JWT_SECRET!, {
      expiresIn: "7d",
    });
  }

  /**
   * Verify a token
   * @param {string} token
   * @return {*}  {Promise<string>}
   * @memberof Session
   */
  public async verifyToken(token: string): Promise<string> {
    this.checkJWTSecret();
    return session.verify(token, this.JWT_SECRET!) as string;
  }

  /**
   * Set a cookie
   * @param {*} event
   * @param {string} uuid
   * @memberof Session
   */
  public create(event: any, uuid: string, name: string = "u_token"): void {
    const token = this.generateToken(uuid);
    setCookie(event, name, token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }

  /**
   * Check if a user is authenticated
   * @param {*} event
   * @return {*}  {Promise<boolean>}
   * @memberof Session
   */
  public async check(event: any, name: string = "u_token"): Promise<boolean> {
    const token = getCookie(event, name);
    if (!token) return false;

    const validation = await this.verifyToken(token);

    if (!validation) {
      deleteCookie(event, name);
    }
    return !!validation;
  }
}
