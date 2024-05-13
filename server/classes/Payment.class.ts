export default class Payment {
  private API_KEY: string = process.env.LEMON_SQUEEZY_API_KEY!;
  private LEMON_SECRET: string = process.env.LEMON_SQUEEZY_SECRET!;
  private LEMON_STORE_ID: string = process.env.LEMON_SQUEEZY_STORE_ID!;
  public LEMON_URL: string = "https://api.lemonsquezzy.com/v1/";
  public productID: string = "268657";

  public addAuth(): string {
    return `Bearer ${this.API_KEY}`;
  }

  public addCheckout(user_id: string): object {
    return {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: user_id,
            },
          },
        },
        relashionships: {
          store: {
            data: {
              type: "stores",
              id: this.LEMON_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: this.productID,
            },
          },
        },
      },
    };
  }

  public checkOutOptions(user_id: string): object {
    return {
      method: "POST",
      headers: {
        Authorization: this.addAuth(),
        "Content-Type": "application/json",
      },
      body: this.addCheckout(user_id),
    };
  }
}
