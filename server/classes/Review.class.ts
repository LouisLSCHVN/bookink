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

  /**
   * Get all reviews
   *
   * @param {string} book_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public async getReviews(book_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE book_id = ?`,
      values: [book_id],
    });
  }

  /**
   * Get a review by its ID
   *
   * @param {string} review_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public async getReviewById(review_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE review_id = ?`,
      values: [review_id],
    });
  }

  /**
   * Get all reviews by user
   *
   * @param {string} user_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public async getReviewsByUser(user_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE user_id = ?`,
      values: [user_id],
    });
  }

  /**
   * Get all reviews by book
   *
   * @param {string} book_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public async getReviewsByBook(book_id: string): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE book_id = ?`,
      values: [book_id],
    });
  }

  /**
   * Update a review
   *
   * @param {string} review_id
   * @param {string} user_id
   * @return {*}  {Promise<Boolean>}
   * @memberof Review
   */
  public async deleteReview(
    review_id: string,
    user_id: string
  ): Promise<Boolean> {
    const result = await db.query({
      query: `DELETE FROM review WHERE review_id = ? AND user_id = ?`,
      values: [review_id, user_id],
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

  /**
   * Get the average rating of a user
   *
   * @param {string} user_id
   * @return {*}  {Promise<number>}
   * @memberof Review
   */
  public async getAverageRatingByUser(user_id: string): Promise<number> {
    const reviews = await this.getReviewsByUser(user_id);
    if (reviews.length === 0) {
      return 0;
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  }

  /**
   * Get all reviews by rating
   *
   * @param {number} rating
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public getReviewByRating(rating: number): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ?`,
      values: [rating],
    });
  }

  /**
   * Get all reviews by rating and book
   *
   * @param {number} rating
   * @param {string} book_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public getReviewByRatingAndBook(
    rating: number,
    book_id: string
  ): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ? AND book_id = ?`,
      values: [rating, book_id],
    });
  }

  /**
   * Get all reviews by rating and user
   *
   * @param {number} rating
   * @param {string} user_id
   * @return {*}  {Promise<any[]>}
   * @memberof Review
   */
  public getReviewByRatingAndUser(
    rating: number,
    user_id: string
  ): Promise<any[]> {
    return db.query({
      query: `SELECT * FROM review WHERE rating = ? AND user_id = ?`,
      values: [rating, user_id],
    });
  }

  public async getMostLikedReviews(): Promise<Object> {
    const result = db.query({
      query: `SELECT * FROM like where likeable_type = 'review' ORDER BY COUNT(*) DESC`,
    });
    return db.checkResult(result) ? result : {};
  }

  public async getMostLikedReviewsByBook(book_id: string): Promise<Object> {
    const result = db.query({
      query: `SELECT * FROM like where likeable_type = 'review' AND likeable_id = ? ORDER BY COUNT(*) DESC`,
      values: [book_id],
    });
    return db.checkResult(result) ? result : {};
  }

  public async getMostLikedReviewsByUser(user_id: string): Promise<Object> {
    const result = db.query({
      query: `SELECT * FROM like where likeable_type = 'review' AND user_id = ? ORDER BY COUNT(*) DESC`,
      values: [user_id],
    });
    return db.checkResult(result) ? result : {};
  }
}
