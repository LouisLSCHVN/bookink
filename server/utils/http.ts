/**
 * Send response to the client with status and message
 * @param {number} status - The HTTP status code. Defaults to 500.
 * @param {string} message - The response message. Defaults to "An error has occurred".
 * @param {object} data - Optional data to include in the response, default {}.
 * @returns {object}
 */
export const createHttpResponse = (
  status: number = 500,
  message: string = "An error has occurred",
  data: object = {}
): object => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
