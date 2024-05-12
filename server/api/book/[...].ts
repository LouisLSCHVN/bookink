import * as cBook from "../../controller/book";

const router = createRouter();

// cUser stands for controller user
router.get("/:title", defineEventHandler(cBook.searchByTitle));
router.get("/single/:id", defineEventHandler(cBook.byID));
router.get("/author/:id", defineEventHandler(cBook.byAuthor));

export default useBase("/api/book", router.handler);
