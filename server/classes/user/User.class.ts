import { session } from "../../utils/classes";
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
  public async getUserByAccessToken(token: string): Promise<any> {
    const user_id = await session.verifyToken(token);
    if (!user_id) return false;

    console.log("user_id DANS GETUSERACCESTOKEN", user_id);
    return await this.getUserById(user_id.toString());
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
  public async getUserById(uuid: string): Promise<any> {
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

  /**
   * Create an access token with the user_id
   *
   * @param {H3Event} event
   * @param {string} user_id
   * @return {*}  {boolean}
   * @memberof User
   */
  public createAccessToken(event: H3Event, user_id: string): boolean {
    try {
      session.create(event, user_id);
    } catch (error) {
      console.error("Token creation error: ", error);
      return false;
    }
    return true;
  }

  /**
   * Generate a double auth code
   * @return {*}  {string}
   * @memberof User
   */
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
