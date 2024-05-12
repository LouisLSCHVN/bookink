# Classes

### Sql

`file: server/classes/Auth.class.ts`

**Attributs:**

- `private pool: Pool` : pool de connexion à la base de données

**Methods:**

- `public query => (query:string, params: any[])` : execute a query on the database
- `private connect` : connect to the database with a pool

---

### Auth

`file: server/classes/Auth.class.ts`

**Methods:**

- `public async login(email: string, password: string): Promise<boolean>` : this method allows a user to log in.
- `public async signup(pseudo: string, email: string, password: string): Promise<boolean>` : this method allows a user to sign up.
- `public async getUserById(id: number): Promise<User>` : this method returns a user by its id.
- `public async getUserByEmail(email: string): Promise<User>` : this method returns a user by its email.
- `public async getUserByPseudo(pseudo: string): Promise<User>` : this method returns a user by its pseudo.
- `public async getUserByToken(token: string): Promise<User>` : this method returns a user by its token.
***

### Session

`file: server/classes/Session.class.ts`

**Attributes:**

- `private JWT_SECRET: string` : The secret key for JWT token generation and verification.

  **Methods:**
- `public checkJWTSecret(): void` : Checks if JWT_SECRET is defined.
- `public generateToken(user_id: string): string` : Generates a JWT token for a given user id.
- `public async verifyToken(token: string): Promise<string>` : Verifies a given JWT token.
- `public create(event: any, uuid: string, name: string = "u_token"): void` : Sets a cookie with a generated JWT token.
- `public async check(event: any, name: string = "u_token"): Promise<boolean>` : Checks if a user is authenticated by verifying the JWT token in the cookie.
