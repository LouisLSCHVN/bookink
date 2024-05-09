import Auth from "~/server/classes/Auth.class";

const auth = new Auth();
const router = createRouter();

router.get(
  "/comfirm/:uuid",
  defineEventHandler(async (event) => {
    const query = getQuery(event);

    const uuid = query.uuid?.toString();
    if (!uuid) return createHttpResponse({ message: "Invalid uuid" });

    const user = await auth.getUserById(uuid);
    if (!user) return createHttpResponse({ message: "User not found" });

    await auth.confirmEmail(uuid);
  })
);

export default useBase("/api/user", router.handler);
