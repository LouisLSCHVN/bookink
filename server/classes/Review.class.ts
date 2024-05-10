export default class Review {
  public async addReview(
    user_id: string,
    book_id: string,
    content: string,
    rating: number,
    spoiler: boolean
  ): Promise<Boolean> {
    const review_id = generateUUID();

    const result = await db.query({
      query: `INSERT INTO review (review_id, user_id, book_id, content, rating, spoiler) VALUES (?, ?, ?, ?, ?, ?)`,
      values: [review_id, user_id, book_id, content, rating, spoiler],
    });
    return db.checkResult(result);
  }

  public async getReviews(book_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE book_id = ?`,
      values: [book_id],
    });
  }

  public async getReviewById(review_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE review_id = ?`,
      values: [review_id],
    });
  }

  public async getReviewsByUser(user_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE user_id = ?`,
      values: [user_id],
    });
  }

  public async deleteReview(review_id: string): Promise<Boolean> {
    const result = await db.query({
      query: `DELETE FROM review WHERE review_id = ?`,
      values: [review_id],
    });
    return db.checkResult(result);
  }
}
