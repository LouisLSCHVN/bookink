export default class Collection {
  public async createReadList(user_id: string): Promise<any> {
    const query =
      "INSERT INTO collection (user_id, name) VALUES (?, 'ReadList)";
    const result = await db.query({
      query: query,
      values: [user_id],
    });
    return db.checkResult(result) ? result : null;
  }

  public async getReadList(user_id: string): Promise<any> {
    const query = "SELECT * FROM collection WHERE user_id = ? AND name = ?";
    const result = await db.query({
      query: query,
      values: [user_id, "ReadList"],
    });
    return db.checkArr(result) ? result : null;
  }

  public async createCollection(user_id: string, name: string): Promise<any> {
    const query = "INSERT INTO collection (user_id, name) VALUES (?, ?)";
    const result = await db.query({
      query: query,
      values: [user_id, name],
    });
    return db.checkResult(result) ? result : null;
  }

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

  public async removeCollection(collection_id: string): Promise<any> {
    const query = "DELETE FROM collection WHERE collection_id = ?";
    const result = await db.query({
      query: query,
      values: [collection_id],
    });
    return db.checkResult(result) ? result : null;
  }

  public async getCollection(user_id: string): Promise<any> {
    const query = "SELECT * FROM collection WHERE user_id = ?";
    const result = await db.query({
      query: query,
      values: [user_id],
    });
    return db.checkArr(result) ? result : null;
  }
}
