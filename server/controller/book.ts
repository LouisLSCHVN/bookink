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

export const searchByTitle = async (event: H3Event) => {
  const query = event.context.params;
  const search = query?.title;
  if (!search) return;

  console.log("search", search);

  const result = await book.getBookByTitle(search);
  if (!result)
    return createHttpResponse({
      status: 200,
      message: "No book found",
    });

  return createHttpResponse({
    status: 200,
    message: "Book found " + result.totalItems,
    data: result.items,
  });
};

export const byAuthor = async (event: H3Event) => {
  const query = event.context.params;
  const author = query?.author;
  if (!author) return;

  const result = await book.getBookByAuthor(author);
  if (!result)
    return createHttpResponse({
      status: 200,
      message: "No book found",
    });

  return createHttpResponse({
    status: 200,
    message: "Book found " + result.totalItems,
    data: result.items,
  });
};
