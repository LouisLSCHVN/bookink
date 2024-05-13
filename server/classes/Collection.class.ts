export default class Collection {
  /**
   * Creates a read list for a user
   *
   * @param {string} user_id
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async createReadList(user_id: string): Promise<any> {
    const collection_id = generateUUID();
    const query =
      "INSERT INTO collection (collection_id, user_id, name) VALUES (?, ?, 'ReadList')";
    const result = await db.query({
      query: query,
      values: [collection_id, user_id],
    });
    return db.checkResult(result) ? result : null;
  }

  /**
   * Creates a collection for a user
   *
   * @param {string} user_id
   * @param {string} name
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async createCollection(user_id: string, name: string): Promise<any> {
    const query = "INSERT INTO collection (user_id, name) VALUES (?, ?)";
    const result = await db.query({
      query: query,
      values: [user_id, name],
    });
    return db.checkResult(result) ? result : null;
  }

  /**
   * Adds a book to a collection
   *
   * @param {string} collection_id
   * @param {string} book_id
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async addBookToCollection(
    collection_id: string,
    book_id: string
  ): Promise<any> {
    const query =
      "INSERT INTO collection_book (collection_id, book_id) VALUES (?, ?)";
    const result = await db.query({
      query: query,
      values: [collection_id, book_id],
    });
    return db.checkResult(result) ? result : null;
  }

  /**
   * Removes a book from a collection
   *
   * @param {string} collection_id
   * @param {string} book_id
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async removeBookFromCollection(
    collection_id: string,
    book_id: string
  ): Promise<any> {
    const query =
      "DELETE FROM collection_book WHERE collection_id = ? AND book_id = ?";
    const result = await db.query({
      query: query,
      values: [collection_id, book_id],
    });
    return db.checkResult(result) ? result : null;
  }

  /**
   * Removes a collection
   *
   * @param {string} collection_id
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async removeCollection(collection_id: string): Promise<any> {
    const query =
      "DELETE FROM collection WHERE collection_id = ? AND name != 'ReadList'";
    const result = await db.query({
      query: query,
      values: [collection_id],
    });
    return db.checkResult(result) ? result : null;
  }

  /**
   * Gets a collection
   *
   * @param {string} user_id
   * @return {*}  {Promise<any>}
   * @memberof Collection
   */
  public async getCollectionsByUserId(user_id: string): Promise<any> {
    const query = "SELECT * FROM collection WHERE user_id = ?";
    const result = await db.query({
      query: query,
      values: [user_id],
    });
    return db.checkArr(result) ? result : null;
  }

  public async getCollectionById(collection_id: string): Promise<any> {
    const query = "SELECT * FROM collection WHERE collection_id = ?";
    const result = await db.query({
      query: query,
      values: [collection_id],
    });
    return db.checkArr(result) ? result : null;
  }

  public async getBooks(collection_id: string): Promise<any> {
    const query = "SELECT * FROM collection_book WHERE collection_id = ?";
    const result = await db.query({
      query: query,
      values: [collection_id],
    });
    return db.checkArr(result) ? result : null;
  }
}
