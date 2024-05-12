import { H3Event } from "h3";
import Auth from "../classes/user/Auth.class";
import { collection } from "../utils/classes";

const auth = new Auth();

/**
 * Signup user
 * @param {H3Event} event
 * @return {*}  {Promise<object>}
 */
export async function signup(event: H3Event): Promise<object> {
  const body = await readBody(event);

  const signed = await auth.signup(body.pseudo, body.email, body.password);
  if (!signed) return createHttpResponse({ message: "Signup failed" });

  const user = await auth.getUserByEmail(body.email);
  const token = auth.createAccessToken(event, user.user_id);
  if (!token) return createHttpResponse({ message: "Token creation failed" });

  const createdReadList = await collection.createReadList(user.user_id);
  if (!createdReadList)
    return createHttpResponse({ message: "ReadList creation failed" });

  return createHttpResponse({
    status: 201,
    message: "User signed up",
    data: { user: user, collection: createdReadList },
  });
}

/**
 * Login user
 * @param {H3Event} event
 * @return {*}  {Promise<object>}
 */
export async function login(event: H3Event): Promise<object> {
  const body = await readBody(event);
  const logged = await auth.login(body.email, body.password);
  if (!logged)
    return createHttpResponse({
      status: 401,
      message: "Login failed",
    });

  const user = await auth.getUserByEmail(body.email);
  auth.createAccessToken(event, user.user_id);

  const userCollections = await collection.getCollection(user.user_id);

  return createHttpResponse({
    status: 200,
    message: "User logged in",
    data: { user: user, collection: userCollections},
  });
}

/**
 * Confirm email
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function confirmEmail(event: H3Event): Promise<void | object> {
  const uuid = event.context.params?.uuid?.toString();
  if (!uuid)
    return createHttpResponse({
      status: 400,
      message: "Invalid uuid",
    });

  const user = await auth.getUserById(uuid);
  if (!user)
    return createHttpResponse({
      status: 404,
      message: "User not found",
    });

  const comfirmed = (await auth.confirmEmail(uuid)) as boolean;
  if (!comfirmed)
    return createHttpResponse({
      message: "Email not confirmed, an error occurred",
    });

  // redirect to /login
  const url = process.env.CLIENT_URL + "/connexion ";
  sendRedirect(event, url);
}

/**
 * Forgot password
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function forgotPassword(event: H3Event): Promise<void | object> {
  const body = await readBody(event);
  const user = await auth.getUserByEmail(body.email);
  if (!user)
    return createHttpResponse({
      status: 404,
      message: "User not found",
    });

  const sent = await auth.resetPassword(body.email);
  if (!sent) return createHttpResponse({ message: "Reset password failed" });

  return createHttpResponse({
    status: 200,
    message: "Reset password email sent",
  });
}

/**
 * Update password
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function updatePassword(event: H3Event): Promise<void | object> {
  const body = await readBody(event);
  const uuid = event.context.params?.uuid?.toString();
  if (!uuid)
    return createHttpResponse({
      status: 404,
      message: "User not found",
    });

  const user = await auth.getUserById(uuid);
  if (user.email !== body.email)
    return createHttpResponse({ message: "Invalid email" });

  const updated = await auth.updatePassword(uuid, body.password);
  if (!updated)
    return createHttpResponse({
      message: "Password update failed",
    });

  return createHttpResponse({
    status: 200,
    message: "Password updated",
  });
}

/**
 * Logout user
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function logout(event: H3Event): Promise<void | object> {
  const token = getCookie(event, "u_token");
  if (!token)
    return createHttpResponse({
      status: 400,
      message: "User not connected",
    });

  deleteCookie(event, "u_token");
  return createHttpResponse({
    status: 200,
    message: "User logged out",
  });
}

/**
 * Authenticate user
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function authenticate(event: H3Event): Promise<void | object> {
  const token = getCookie(event, "u_token");
  console.log("token", token);
  if (!token)
    return createHttpResponse({
      status: 401,
      message: "User not connected",
    });

  const user = await auth.getUserByAccessToken(token);
  if (!user)
    return createHttpResponse({
      status: 401,
      message: "User not connected",
    });

  return createHttpResponse({
    status: 200,
    message: "User authenticated",
    data: { user: user },
  });
}

/**
 * Get user profile
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export function profile(event: H3Event) {
  const pseudo = event.context.params?.uuid?.toString();

  if (!pseudo)
    return createHttpResponse({
      status: 404,
      message: "User not found",
    });

  const user = auth.getUserByPseudo(pseudo);
  return createHttpResponse({
    status: 200,
    message: "User found",
    data: { user: user },
  });
}

/**
 * Get current user
 * @param {H3Event} event
 * @return {*}  {(void | object)}
 */
export async function me(event: H3Event): Promise<any> {
  const token = getCookie(event, "u_token");
  if (!token)
    return createHttpResponse({
      status: 401,
      message: "User not connected",
    });

  const user = await auth.getUserByAccessToken(token);
  if (!user)
    return createHttpResponse({
      status: 401,
      message: "User not connected",
    });

  return createHttpResponse({
    status: 200,
    message: "User authenticated",
    data: { user: user },
  });
}
