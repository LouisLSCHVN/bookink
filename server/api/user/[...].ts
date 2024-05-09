import * as controlUser from "~/server/controller/user";

const router = createRouter();

router.post("/signup", defineEventHandler(controlUser.signup));
router.post("/login", defineEventHandler(controlUser.login));
router.get("/confirm/:uuid", defineEventHandler(controlUser.confirmEmail));

export default useBase("/api/user", router.handler);
