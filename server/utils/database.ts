import Mail from "../classes/Mail.class";
import Session from "../classes/Session.class";
import Sql from "../classes/Sql.class";
import { v4 as uuid } from "uuid";

/**
 * Database instance of the Sql class.
 * @type {Sql}
 * @public
 * @static
 * @memberof Sql
 * @see Sql
 */
export const db: Sql = new Sql();

/**
 * @description - Generates a unique identifier using the uuid library
 * @returns {string} - Returns a unique identifier
 */
export const generateUUID = (): string => {
  return uuid();
};

/**
 * Session instance of the Session class.
 * @type {Session}
 * @public
 * @static
 * @memberof Session
 * @see Session
 */
export const session: Session = new Session();

/**
 * Mail instance of the Mail class.
 * @type {Mail}
 * @public
 * @static
 * @memberof Mail
 * @see Mail
 */
export const mail: Mail = new Mail();
