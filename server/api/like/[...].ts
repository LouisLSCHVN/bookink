import * as cLike from "~/server/controller/likes";

const router = createRouter();

router.post("/add", defineEventHandler(cLike.add));
router.delete("/remove", defineEventHandler(cLike.remove));
router.get("/get/:uuid", defineEventHandler(cLike.getLikes));
router.get("/user/:uuid", defineEventHandler(cLike.getLikesByUser));
router.get("/count/:uuid", defineEventHandler(cLike.getCount));

export default useBase("/api/likes", router.handler);
