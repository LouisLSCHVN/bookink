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
  const authUser = await user.getUserByAccessToken(token);
  const { likeable_type, likeable_id } = body;

  if (!likeable_type || !likeable_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const result = await like.add(likeable_type, likeable_id, authUser.user_id);
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
};

export const remove = async (event: H3Event) => {
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
  const authUser = await user.getUserByAccessToken(token);
  if (!authUser) {
    return createHttpResponse({
      status: 401,
      message: "Unauthorized",
    });
  }

  const { likeable_type, likeable_id } = body;

  if (!likeable_type || !likeable_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const result = await like.remove(likeable_id, authUser.user_id);
  if (!result) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Like removed",
  });
};

export const getLikes = async (event: H3Event) => {
  const likeable_id = event.context.params?.uuid;

  if (!likeable_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const result = await like.getByLikeable(likeable_id);
  if (!result) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Likes retrieved",
    data: result,
  });
};

export const getLikesByUser = async (event: H3Event) => {
  const user_id = event.context.params?.uuid;

  if (!user_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const result = await like.getByUser(user_id);
  if (!result) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Likes retrieved",
    data: result,
  });
};

export const getCount = async (event: H3Event) => {
  const likeable_id = event.context.params?.uuid;

  if (!likeable_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const result = await like.countByLikeable(likeable_id);
  if (!result) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Likes count retrieved",
    data: result,
  });
}