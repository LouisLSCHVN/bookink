import * as session from "jsonwebtoken";
import { H3Event } from "h3";

/**
 * Session class (generateToken, verifyToken, create, checkCookie)
 *
 * @export
 * @class Session
 */
export default class Session {
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
   * @param {H3Event} event
   * @param {string} uuid
   * @memberof Session
   */
  public create(event: H3Event, uuid: string, name: string = "u_token"): void {
    const token = this.generateToken(uuid);
    setCookie(event, name, token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  }

  /**
   * Check if a user is authenticated
   * @param {H3Event} event
   * @return {*}  {Promise<boolean>}
   * @memberof Session
   */
  public async check(
    event: H3Event,
    name: string = "u_token"
  ): Promise<boolean> {
    const token = getCookie(event, name);
    if (!token) return false;

    const validation = await this.verifyToken(token);

    if (!validation) {
      deleteCookie(event, name);
    }
    return !!validation;
  }
}
