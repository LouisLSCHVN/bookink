import * as cBook from "../../controller/book";
import { H3Event } from "h3";
const router = createRouter();

// cUser stands for controller user
router.get("/:title", defineEventHandler(cBook.searchByTitle));
router.get("/single/:id", defineEventHandler(cBook.byID));

export default useBase("/api/book", router.handler);
