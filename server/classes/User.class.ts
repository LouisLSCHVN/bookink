import Sql from "./Sql.class";

export default class User {
    constructor(private username: string, private email: string, private password: string) {}

    static createAccount(username: string, email: string, password: string): User {
        const hashedPassword = this.hashPassword(password);
        return new User(username, email, hashedPassword);
    }

    private static hashPassword(password: string): string {
        // Implement password hashing logic here
        // Example: return bcrypt.hashSync(password, saltRounds);
        return password;
    }
}
