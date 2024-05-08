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
