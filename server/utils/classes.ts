import Book from "../classes/Book.class";
import Collection from "../classes/Collection.class";
import Like from "../classes/Like.class";
import Payment from "../classes/Payment.class";
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

/**
 * User instance of the User class.
 * @type {User}
 * @public
 * @static
 * @memberof User
 * @see User
 */
export const user: User = new User();

/**
 * Book instance of the Book class.
 * @type {Book}
 * @public
 * @static
 * @memberof Book
 * @see Book
 */
export const book: Book = new Book();

/**
 * Review instance of the Review class.
 * @type {Review}
 * @public
 * @static
 * @memberof Review
 * @see Review
 */
export const review: Review = new Review();

/**
 * Like instance of the Like class.
 * @type {Like}
 * @public
 * @static
 * @memberof Like
 * @see Like
 */
export const like: Like = new Like();

/**
 * Collection instance of the Collection class.
 * @type {Collection}
 * @public
 * @static
 * @memberof Collection
 * @see Collection
 */
export const collection: Collection = new Collection();

/**
 * Payment instance of the Payment class.
 * @type {Payment}
 * @public
 * @static
 * @memberof Payment
 * @see Payment
 */
export const payment: Payment = new Payment();
