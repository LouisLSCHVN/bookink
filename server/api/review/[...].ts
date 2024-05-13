import * as cReview from "../../controller/review";
const router = createRouter();

router.post("/create", defineEventHandler(cReview.create));
router.get("/book/:uuid", defineEventHandler(cReview.getByBooks));
router.get("/user/:uuid", defineEventHandler(cReview.getByUsers));
router.delete("/:uuid", defineEventHandler(cReview.remove));

export default useBase("/api/review", router.handler);
