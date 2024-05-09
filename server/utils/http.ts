interface HttpResponse {
  status?: number;
  message?: string;
  data?: object;
}

/**
 * Send response to the client with status and message
 * @param {HttpResponse} { status, message, data }
 * @returns {object}
 */
export const createHttpResponse = ({
  status = 500,
  message = "An error has occurred",
  data = {},
}: HttpResponse): object => {
  return {
    status: status,
    message: message,
    data: data,
  };
};
