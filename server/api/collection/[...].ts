import * as cCollection from "../../controller/collection";
const router = createRouter();

router.post("/create", defineEventHandler(cCollection.create));
router.post("/add/", defineEventHandler(cCollection.addBook));
router.post("/remove/", defineEventHandler(cCollection.removeBook));
router.get(
  "/books/:uuid",
  defineEventHandler(cCollection.getCollectionAndBooks)
);
router.get("/user/:uuid", defineEventHandler(cCollection.getCollectionByUser));
router.delete("/:uuid", defineEventHandler(cCollection.remove));

export default useBase("/api/collection", router.handler);

/**
 * Collection API
 *
 * create : POST /api/collection/create
 * addBook : POST /api/collection/add/
 * removeBook : POST /api/collection/remove/
 * getCollectionAndBooks : GET /api/collection/books/:uuid
 * getCollectionByUser : GET /api/collection/user/:uuid
 * remove : DELETE /api/collection/:uuid
 *
 */
