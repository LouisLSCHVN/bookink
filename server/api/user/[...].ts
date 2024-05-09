import * as cUser from "~/server/controller/user";

const router = createRouter();

// cUser stands for controller user

router.post("/signup", defineEventHandler(cUser.signup));
router.post("/login", defineEventHandler(cUser.login));
router.get("/logout", defineEventHandler(cUser.logout));
router.get("/auth", defineEventHandler(cUser.authenticate));

router.get("/profile/:uuid", defineEventHandler(cUser.profile));
router.get("/me", defineEventHandler(cUser.me));

router.get("/confirm/:uuid", defineEventHandler(cUser.confirmEmail));
router.post("/reset-password", defineEventHandler(cUser.forgotPassword));
router.post("/update-password/:uuid", defineEventHandler(cUser.updatePassword));

export default useBase("/api/user", router.handler);
