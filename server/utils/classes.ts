import Book from "../classes/Book.class";
import Like from "../classes/Like.class";
import Review from "../classes/Review.class";
import User from "../classes/user/User.class";
import Mail from "../classes/utils/Mail.class";
import Session from "../classes/utils/Session.class";

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

export const user: User = new User();

export const book: Book = new Book();

export const review: Review = new Review();

export const like = new Like();
