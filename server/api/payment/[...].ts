import * as cPayment from "../../controller/payment";
const router = createRouter();

router.post(
  "/checkout",
  defineEventHandler((event) => {
    console.log("route hit in /api/payment");
    return cPayment.checkout(event);
  })
);

export default useBase("/api/payment", router.handler);

/**
 *
 * api route
 * /api/payment/checkout
 *
 */
