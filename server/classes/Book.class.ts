export default class Book {
  private KEY: string = process.env.GOOGLE_BOOKS_API_KEY!;
  private URL: string = "https://www.googleapis.com/books/v1/volumes?q=";

  /**
   * Check if KEY is defined
   * @memberof Book
   */
  public checkKey(): void {
    if (!this.KEY) throw new Error("KEY is not defined");
  }

  public useURL(params: string): string {
    return `${this.URL}${params}&orderBy=relevance&hl=en&lang=en&key=${this.KEY}`;
  }

  /**
   * Get a book by its ISBN
   * @param {string} isbn - ISBN of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookByISBN(isbn: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(`isbn:${isbn}`));
    return res;
  }

  /**
   * Get a book by its title
   * @param {string} title - Title of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookByTitle(title: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(`intitle:${title}`));
    return res;
  }

  /**
   * Get a book by its author
   * @param {string} author - Author of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookByAuthor(author: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(`inauthor:${author}`));
    return res;
  }

  /**
   * Get a book by its ID
   * @param {string} id - ID of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookById(id: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(`${this.URL}/${id}&key=${this.KEY}`);
    return res;
  }

  /**
   * Get a book by its category
   * @param {string} category - Category of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookByCategory(category: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(`subject:${category}`));
    return res;
  }

  /**
   * Get a book by its publisher
   * @param {string} publisher - Publisher of the book
   * @returns {Promise<any>} - Returns a promise
   * @memberof Book
   */
  public async getBookByPublisher(publisher: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(`inpublisher:${publisher}`));
    return res;
  }

  public async getBookCardInfo(search: string): Promise<any> {
    this.checkKey();
    const res = await $fetch(this.useURL(search));
    return res;
  }
}
