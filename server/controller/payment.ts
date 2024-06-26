import { H3Event } from "h3";
import { payment } from "../utils/classes";

export const checkout = async (event: H3Event) => {
  const u_token = getCookie(event, "u_token");

  if (!u_token) {
    return createHttpResponse({ status: 401, message: "Unauthorized" });
  }

  const authUser = await user.getUserByAccessToken(u_token);
  if (!authUser) {
    return createHttpResponse({ status: 401, message: "Unauthorized" });
  }

  const user_id = authUser.user_id;

  console.log("Payment", payment.LEMON_URL + "checkouts");
  console.log("checkOutOptions", payment.checkOutOptions(user_id));

  const lemonPayment = await $fetch(
    payment.LEMON_URL + "checkouts",
    payment.checkOutOptions(user_id)
  );
  console.log("lemonPayment", lemonPayment);
  console.log(lemonPayment);
  return lemonPayment;
};
