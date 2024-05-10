import Book from "~/server/classes/Book.class";
import { H3Event } from "h3";
const router = createRouter();

// cUser stands for controller user
const book = new Book();
router.get(
  "/:title",
  defineEventHandler(async (event: H3Event) => {
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
  })
);
router.get(
  "/single/:id",
  defineEventHandler(async (event: H3Event) => {
    const query = event.context.params;
    const id = query?.id;
    if (!id)
      return createHttpResponse({
        status: 200,
        message: "No book found",
      });
    const result = await book.getBookById(id);
    if (!result)
      return createHttpResponse({
        status: 200,
        message: "No book found",
      });
    return createHttpResponse({
      status: 200,
      message: "Book found",
      data: result,
    });
  })
);

export default useBase("/api/book", router.handler);
