export default class User {
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
