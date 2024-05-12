import { H3Event } from "h3";
import { review, user } from "../utils/classes";

export const create = async (event: H3Event) => {
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

  const valid = await checkContent(content);
  if (!valid)
    return createHttpResponse({
      status: 400,
      message: "Content could be offensive or inappropriate",
    });
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
};

export const getByBooks = async (event: H3Event) => {
  const query = event.context.params;
  const book_id = query?.uuid;

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
};

export const getByUsers = async (event: H3Event) => {
  const query = event.context.params;
  const user_id = query?.uuid;

  if (!user_id)
    return createHttpResponse({ status: 200, message: "No user found" });

  const result = await review.getReviewsByUser(user_id);
  if (!result)
    return createHttpResponse({ status: 200, message: "No user found" });

  return createHttpResponse({
    status: 200,
    message: "Reviews Found",
    data: result,
  });
};

export const remove = async (event: H3Event) => {
  const query = event.context.params;
  const review_id = query?.uuid;

  if (!review_id)
    return createHttpResponse({ status: 200, message: "No review found" });

  const u_token = getCookie(event, "u_token");
  if (!u_token)
    return createHttpResponse({ status: 401, message: "Unauthorized" });

  const authUser = await user.getUserByAccessToken(u_token);

  if (!authUser)
    return createHttpResponse({ status: 401, message: "Unauthorized" });

  const result = await review.deleteReview(review_id, authUser.user_id);
  if (!result)
    return createHttpResponse({ status: 200, message: "No review found" });

  return createHttpResponse({
    status: 200,
    message: "Review deleted successfully",
  });
};
