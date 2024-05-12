import * as cReview from "../../controller/review";
const router = createRouter();

router.post("/create", cReview.create);
router.get("/book/:uuid", cReview.getByBooks);
router.get("/user/:uuid", cReview.getByUsers);
router.delete("/:uuid", cReview.remove);

export default useBase("/api/review", router.handler);
