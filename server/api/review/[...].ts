import Review from "~/server/classes/Review.class";
import { H3Event } from "h3";
import User from "~/server/classes/user/User.class";
import Session from "~/server/classes/utils/Session.class";
const router = createRouter();

const review = new Review();
const user = new User();
const session = new Session();

// cUser stands for controller user
router.post(
  "/create",
  defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event);

    const token = getCookie(event, "u_token");
    if (!token)
      return createHttpResponse({
        status: 401,
        message: "Unauthorized",
      });
    const loginUser = await user.getUserByAccessToken(token); // Await the function call to get the user object
    console.log("loginUser", loginUser);

    const { book_id, content, rating, spoiler } = body;
    const res = await review.addReview(
      loginUser.user_id,
      book_id,
      content,
      rating,
      spoiler
    );

    if (!res)
      return createHttpResponse({
        status: 400,
        message: "Failed to add review",
      });

    return createHttpResponse({
      status: 200,
      message: "Review added successfully",
    });
  })
);
router.get(
  "/:book_id",
  defineEventHandler(async (event: H3Event) => {
    const query = event.context.params;
    const book_id = query?.book_id;

    if (!book_id)
      return createHttpResponse({ status: 200, message: "No book found" });

    const result = await review.getReviews(book_id);
    if (!result)
      return createHttpResponse({ status: 200, message: "No book found" });

    return createHttpResponse({
      status: 200,
      message: "Reviews Found",
      data: result,
    });
  })
);
export default useBase("/api/review", router.handler);
