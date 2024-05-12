export default class Like {
  /**
   * Add a like
   *
   * @param {string} likeable_type
   * @param {string} likeable_id
   * @param {string} user_id
   * @return {*}
   * @memberof Like
   */
  public async add(
    likeable_type: string,
    likeable_id: string,
    user_id: string
  ): Promise<Boolean> {
    const uuid = generateUUID();

    const query = `INSERT INTO like (like_id, likeable_type, likeable_id, user_id) VALUES (?, ?, ?, ?)`;
    const result = db.query({
      query,
      values: [uuid, likeable_type, likeable_id, user_id],
    });
    return db.checkResult(result);
  }

  /**
   * Remove a like
   *
   * @param {string} like_id
   * @param {string} user_id
   * @return {*}
   * @memberof Like
   */
  public async remove(like_id: string, user_id: string): Promise<Boolean> {
    const query = `DELETE FROM like WHERE like_id = ? AND user_id = ?`;
    const result = db.query({ query, values: [like_id, user_id] });
    return db.checkResult(result);
  }

  /**
   * Get all likes by user
   *
   * @return {*}
   * @memberof Like
   */
  public async getByUser(user_id: string): Promise<Object> {
    const query = `SELECT * FROM like WHERE user_id = ?`;
    const result = db.query({ query, values: [user_id] });
    return db.checkResult(result) ? result : {};
  }

  /**
   * Get all likes by likeable
   *
   * @return {*}
   * @memberof Like
   */
  public async getByLikeable(likeable_id: string): Promise<Object> {
    const query = `SELECT * FROM like WHERE likeable_id = ?`;
    const result = db.query({ query, values: [likeable_id] });
    return db.checkResult(result) ? result : {};
  }

  /**
   * Get all likes by likeable type
   *
   * @return {*}
   * @memberof Like
   */
  public async getByLikeableType(likeable_type: string): Promise<Object> {
    const query = `SELECT * FROM like WHERE likeable_type = ?`;
    const result = db.query({ query, values: [likeable_type] });
    return db.checkResult(result) ? result : {};
  }

  /**
   * Get all likes by likeable and user
   *
   * @return {*}
   * @memberof Like
   */
  public async getByLikeableAndUser(
    likeable_id: string,
    user_id: string
  ): Promise<Object> {
    const query = `SELECT * FROM like WHERE likeable_id = ? AND user_id = ?`;
    const result = db.query({ query, values: [likeable_id, user_id] });
    return db.checkResult(result) ? result : {};
  }

  /**
   * Count likes by likeable
   *
   * @return {*}
   * @memberof Like
   */
  public async countByLikeable(likeable_id: string): Promise<Object> {
    const query = `SELECT COUNT(*) as totalLikes FROM like WHERE likeable_id = ?`;
    const result = db.query({ query, values: [likeable_id] });
    return db.checkResult(result) ? result : {};
  }
}
