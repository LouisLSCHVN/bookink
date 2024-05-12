import { H3Event } from "h3";
import { like, user } from "../utils/classes";

export const add = async (event: H3Event) => {
  const body = await readBody(event);

  if (!body) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const token = getCookie(event, "u_token");
  if (!token) {
    return createHttpResponse({
      status: 401,
      message: "Unauthorized",
    });
  }
  const user_id = await user.getUserByAccessToken(token);
  const { likeable_type, likeable_id } = body;

  if (!likeable_type || !likeable_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });

    const result = await like.add(likeable_type, likeable_id, user_id);
    if (!result) {
      return createHttpResponse({
        status: 500,
        message: "Internal server error",
      });
    }

    return createHttpResponse({
      status: 201,
      message: "Like added",
    });
  }
};
