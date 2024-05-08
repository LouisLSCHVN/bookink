const router = createRouter();

router.get(
  "/hello",
  defineEventHandler((event) => {
    const query = getQuery(event);

    const session = useSession(event, { password: generateUUID() });

    return {
      message: `Hello ${query.name || "World"}!`,
      uuid: generateUUID(),
    };
  })
);

export default useBase("/api", router.handler);
