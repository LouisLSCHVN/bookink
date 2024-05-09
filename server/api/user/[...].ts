import * as controlUser from "~/server/controller/user";

const router = createRouter();

router.post("/signup", defineEventHandler(controlUser.signup));
router.post("/login", defineEventHandler(controlUser.login));
router.get("/logout", defineEventHandler(controlUser.logout));
router.get("/auth", defineEventHandler(controlUser.authenticate));

router.get("/profile/:uuid", defineEventHandler(controlUser.profile));
router.get("/me", defineEventHandler(controlUser.me));

router.get("/confirm/:uuid", defineEventHandler(controlUser.confirmEmail));
router.post("/reset-password", defineEventHandler(controlUser.forgotPassword));
router.post(
  "/update-password/:uuid",
  defineEventHandler(controlUser.updatePassword)
);

export default useBase("/api/user", router.handler);
