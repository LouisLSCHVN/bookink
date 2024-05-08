const router = createRouter();

router.get(
  "/hello",
  defineEventHandler((event) => {
    const query = getQuery(event);
    return {
      message: `Hello ${query.name || "World"}!`,
    };
  })
);

export default useBase("/api", router.handler);
