import { session } from "../../utils/database";
import { H3Event } from "h3";

export default class User {
  /**
   * Return a user without the password
   * @param {User} user
   * @return {*}  {Promise<boolean>}
   * @memberof Auth
   */
  public userSaveReturn(user: any): any {
    delete user.password;
    delete user.double_auth_code;
    return user;
  }

  /**
   * Get user by token
   * @param {string} token
   * @return {*}  {Promise<User>}
   * @memberof Auth
   */
  public async getUserByAccessToken(token: string): Promise<any | null[]> {
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
    const query = "SELECT * FROM user WHERE pseudo = ?";
    const user = await db.query({
      query: query,
      values: [pseudo],
    });
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
    const user = await db.query({
      query: query,
      values: [uuid],
    });
    return db.checkArr(user) ? this.userSaveReturn(user[0]) : null;
  }

  /**
   * Get user by email
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof User
   */
  public async getUserByEmail(email: string): Promise<any | null[]> {
    const query = "SELECT * FROM user WHERE email = ?";
    const user = await db.query({
      query: query,
      values: [email],
    });
    return db.checkArr(user) ? this.userSaveReturn(user[0]) : null;
  }

  public createAccessToken(event: H3Event, user_id: string): boolean {
    try {
      const token = session.generateToken(user_id);
      session.create(event, token);
    } catch (error) {
      console.error("Token creation error: ", error);
      return false;
    }
    return true;
  }

  public generateDoubleAuthCode(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code.toUpperCase().toString();
  }
}
