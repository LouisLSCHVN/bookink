import { H3Event } from "h3";
import Auth from "../classes/Auth.class";

const auth = new Auth();

/**
 * Signup user
 * @param {H3Event} event
 * @return {*}  {Promise<object>}
 */
export async function signup(event: H3Event): Promise<object> {
  const body = await readBody(event);

  const email = await auth.getUserByEmail(body.email);
  if (email) return createHttpResponse({ message: "Email already exists" });

  const signed = await auth.signup(body.pseudo, body.email, body.password);
  if (!signed) return createHttpResponse({ message: "Signup failed" });

  const user = await auth.getUserByEmail(body.email);
  const token = auth.createAccessToken(event, user.user_id);
  if (!token) return createHttpResponse({ message: "Token creation failed" });

  return createHttpResponse({
    status: 201,
    message: "User signed up",
    data: { user: user },
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
  if (!logged) return createHttpResponse({ message: "Login failed" });

  const user = await auth.getUserByEmail(body.email);
  auth.createAccessToken(event, user.user_id);

  return createHttpResponse({
    status: 200,
    message: "User logged in",
    data: { user: user },
  });
}

export async function confirmEmail(event: H3Event): Promise<void | object> {
  const uuid = event.context.params?.uuid?.toString();
  if (!uuid) return createHttpResponse({ message: "Invalid uuid" });

  const user = await auth.getUserById(uuid);
  if (!user) return createHttpResponse({ message: "User not found" });

  const comfirmed = (await auth.confirmEmail(uuid)) as boolean;
  if (!comfirmed) return createHttpResponse({ message: "Email not confirmed" });

  // redirect to /login
  const url = process.env.CLIENT_URL + "/login";
  console.log(url);
  sendRedirect(event, url);
}
