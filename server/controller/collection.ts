import { H3Event } from "h3";
import auth from "~/middleware/auth";

export const create = async (event: H3Event) => {
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

  let { name } = body;

  if (!name) {
    name = "Untitled Collection";
  }

  if (
    name === "ReadList" ||
    name === "readlist" ||
    name === "Readlist" ||
    name === "readList" ||
    name === "Read list" ||
    name === "read list"
  ) {
    return createHttpResponse({
      status: 400,
      message: "Invalid collection name",
    });
  }

  const result = await collection.createCollection(authUser.user_id, name);
  if (!result) {
    return createHttpResponse({ message: "Internal server error" });
  }

  return createHttpResponse({
    status: 201,
    message: "Collection created",
    data: result,
  });
};

export const addBook = async (event: H3Event) => {
  // get book_id & collection_id from body
  // get user_id from token
  // verify user_id has access to collection_id
  // add book to collection
  // return response

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

  const { book_id, collection_id } = body;
  if (!book_id || !collection_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const coll = await collection.getCollectionById(collection_id);
  if (!coll || coll.user_id !== authUser.user_id) {
    return createHttpResponse({
      status: 403,
      message: "Forbidden",
    });
  }

  if (coll.user_id !== authUser.user_id) {
    return createHttpResponse({
      status: 403,
      message: "Forbidden",
    });
  }

  const result = await collection.addBookToCollection(collection_id, book_id);
  if (!result) {
    return createHttpResponse({ message: "Internal server error" });
  }

  return createHttpResponse({
    status: 201,
    message: "Book added to collection",
    data: result,
  });
};

export const removeBook = async (event: H3Event) => {
  // get book_id & collection_id from body
  // get user_id from token
  // verify user_id has access to collection_id
  // remove book from collection
  // return response

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

  const { book_id, collection_id } = body;
  if (!book_id || !collection_id) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const coll = await collection.getCollectionById(collection_id);
  if (!coll || coll.user_id !== authUser.user_id) {
    return createHttpResponse({
      status: 403,
      message: "Forbidden",
    });
  }

  const result = await collection.removeBookFromCollection(
    collection_id,
    book_id
  );
  if (!result) {
    return createHttpResponse({ message: "Internal server error" });
  }

  return createHttpResponse({
    status: 201,
    message: "Book removed from collection",
    data: result,
  });
};

export const getCollectionAndBooks = async (event: H3Event) => {
  const uuid = event.context.params?.uuid;
  if (!uuid) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const coll = await collection.getCollectionById(uuid);
  if (!coll) {
    return createHttpResponse({
      status: 404,
      message: "Collection not found",
    });
  }

  const books = await collection.getBooks(uuid);
  if (!books) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Collection and books retrieved",
    data: { collection: coll, books: books },
  });
};

export const getCollectionByUser = async (event: H3Event) => {
  const uuid = event.context.params?.uuid;
  if (!uuid) {
    return createHttpResponse({
      status: 400,
      message: "Invalid request",
    });
  }

  const coll = await collection.getCollectionsByUserId(uuid);
  if (!coll) {
    return createHttpResponse({
      status: 404,
      message: "Collection not found",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Collection retrieved",
    data: coll,
  });
};

export const remove = async (event: H3Event) => {
  const uuid = event.context.params?.uuid;
  if (!uuid) {
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

  const coll = await collection.getCollectionById(uuid);
  if (!coll || coll.user_id !== authUser.user_id) {
    return createHttpResponse({
      status: 403,
      message: "Forbidden",
    });
  }

  const result = await collection.removeCollection(uuid);
  if (!result) {
    return createHttpResponse({
      status: 500,
      message: "Internal server error",
    });
  }

  return createHttpResponse({
    status: 200,
    message: "Collection removed",
  });
};
