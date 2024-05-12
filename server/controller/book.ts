import Book from "../classes/Book.class";
import { H3Event } from "h3";

const book = new Book();

export const byID = (event: H3Event) => {
  if (!event.context.params)
    return createHttpResponse({
      status: 400,
      message: "Book ID is required",
    });
  const uuid = event.context.params.uuid;
  const books = book.getBookById(uuid);
  return createHttpResponse({
    status: 200,
    message: "Book fetched successfully",
    data: books,
  });
};
