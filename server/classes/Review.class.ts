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

  public async getReviewsByBook(book_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE book_id = ?`,
      values: [book_id],
    });
  }

  public async deleteReview(review_id: string): Promise<Boolean> {
    const result = await db.query({
      query: `DELETE FROM review WHERE review_id = ?`,
      values: [review_id],
    });
    return db.checkResult(result);
  }

  public async getAverageRatingByBook(book_id: string): Promise<number> {
    const reviews = await this.getReviewsByBook(book_id);
    if (reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  }

  public async getReviewCountByBook(book_id: string): Promise<number> {
    const reviews = await this.getReviewsByBook(book_id);
    return reviews.length;
  }

  public async getReviewCountByUser(user_id: string): Promise<number> {
    const reviews = await this.getReviewsByUser(user_id);
    return reviews.length;
  }

  public async getAverageRatingByUser(user_id: string): Promise<number> {
    const reviews = await this.getReviewsByUser(user_id);
    if (reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  }

  public getReviewByRating(rating: number): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ?`,
      values: [rating],
    });
  }

  public getReviewByRatingAndBook(
    rating: number,
    book_id: string
  ): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ? AND book_id = ?`,
      values: [rating, book_id],
    });
  }

  public getReviewByRatingAndUser(
    rating: number,
    user_id: string
  ): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ? AND user_id = ?`,
      values: [rating, user_id],
    });
  }
}
