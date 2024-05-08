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
- `public async userExists(pseudo: string): Promise<boolean>` : this method checks if a user exists in the database.
- `public async emailExists(email: string): Promise<boolean>` : this method checks if an email exists in the database.

---

### User

`file: server/classes/Auth.class.ts`
