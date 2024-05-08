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
---

### User

`file: server/classes/Auth.class.ts`

**Methods:**
- `public async getUserById(id: number): Promise<User>` : this method returns a user by its id.
- `public async getUserByEmail(email: string): Promise<User>` : this method returns a user by its email.
- `public async getUserByPseudo(pseudo: string): Promise<User>` : this method returns a user by its pseudo.
- `public async getUserByToken(token: string): Promise<User>` : this method returns a user by its token.
-
