export default class Like {
  public async add(
    likeable_type: string,
    likeable_id: string,
    user_id: string
  ) {
    const uuid = generateUUID();

    const query = `INSERT INTO like (like_id, likeable_type, likeable_id, user_id) VALUES (?, ?, ?, ?)`;
    const result = db.query({
      query,
      values: [uuid, likeable_type, likeable_id, user_id],
    });
    return db.checkResult(result);
  }

  public async remove(like_id: string, user_id: string) {
    const query = `DELETE FROM like WHERE like_id = ? AND user_id = ?`;
    const result = db.query({ query, values: [like_id, user_id] });
    return db.checkResult(result);
  }

  public async getByUser(user_id: string) {
    const query = `SELECT * FROM like WHERE user_id = ?`;
    const result = db.query({ query, values: [user_id] });
    return db.checkResult(result);
  }

  public async getByLikeable(likeable_id: string) {
    const query = `SELECT * FROM like WHERE likeable_id = ?`;
    const result = db.query({ query, values: [likeable_id] });
    return db.checkResult(result);
  }

  public async getByLikeableType(likeable_type: string) {
    const query = `SELECT * FROM like WHERE likeable_type = ?`;
    const result = db.query({ query, values: [likeable_type] });
    return db.checkResult(result);
  }

  public async getByLikeableAndUser(likeable_id: string, user_id: string) {
    const query = `SELECT * FROM like WHERE likeable_id = ? AND user_id = ?`;
    const result = db.query({ query, values: [likeable_id, user_id] });
    return db.checkResult(result);
  }

  public async countByLikeable(likeable_id: string) {
    const query = `SELECT COUNT(*) as totalLikes FROM like WHERE likeable_id = ?`;
    const result = db.query({ query, values: [likeable_id] });
    return db.checkResult(result);
  }
}
