import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

/**
 * Mail class (send, init)
 * @export
 * @class Mail
 */
export default class Mail {
  private static transporter: Transporter | null = null;
  public static MAIL_ADDRESS: string = process.env.MAIL_ADDRESS!;
  private static MAIL_PASS: string = process.env.MAIL_PASS!;

  constructor() {
    Mail.init();
  }

  /**
   * Initialize the transporter
   * @memberof Mail
   */
  public static init(): void {
    if (!this.MAIL_ADDRESS) {
      throw new Error("MAIL_ADDRESS is not defined");
    }
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: this.MAIL_ADDRESS,
        pass: this.MAIL_PASS,
      },
    });
  }

  /**
   * Send an email
   * @param {any} options
   * @return {*}  {Promise<void>}
   * @memberof Mail
   */
  public async send(options: any): Promise<void> {
    if (!Mail.transporter) throw new Error("Transporter not initialized");
    try {
      await Mail.transporter.sendMail(options);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get the mail address
   * @return {*}  {string}
   * @memberof Mail
   */
  public getAddress(): string {
    return Mail.MAIL_ADDRESS;
  }
}
